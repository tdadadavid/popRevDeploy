"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshAccessToken = void 0;
const core_1 = require("../../core");
class RefreshAccessToken {
    constructor(tokenService, dbUser) {
        this.tokenService = tokenService;
        this.dbUser = dbUser;
        this.refresh = ({ cookies }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cookieRefreshToken = cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken;
                if (!cookieRefreshToken)
                    throw new core_1.UnAuthorizedError("Unauthorized");
                const refreshToken = this.tokenService.decryptToken(cookieRefreshToken);
                if (!refreshToken)
                    throw new core_1.UnAuthorizedError("Unauthorized");
                const user = yield this.tokenService.isRefreshTokenValid(refreshToken);
                if (!user)
                    throw new core_1.UnAuthorizedError("Unauthorized");
                if (this.tokenService.decryptToken(user === null || user === void 0 ? void 0 : user.refreshToken) !== refreshToken)
                    throw new core_1.UnAuthorizedError("Unauthorized");
                const newRefreshToken = this.tokenService.createAndEncryptRefreshToken({
                    id: user.id,
                });
                const accessToken = this.tokenService.createAndEncryptAccessToken({
                    id: user.id,
                    role: user.roleId,
                    refreshToken,
                });
                core_1.cookieHandler.saveToHttpOnlyCookie({
                    cookieName: "refreshToken",
                    data: newRefreshToken,
                    res,
                });
                core_1.cookieHandler.saveToHttpOnlyCookie({
                    cookieName: "accessToken",
                    data: accessToken,
                    res,
                });
                // Store RefreshToken in Db
                yield this.dbUser.update({ refreshToken, refreshTokenExp: new Date() }, { where: { id: user.id } });
                return core_1.responseHandler.responseSuccess(204, "Token Refreshed Successfully");
            }
            catch (error) {
                console.log(error);
                return core_1.responseHandler.responseError(400, `Error Refreshing Token ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
    }
}
exports.RefreshAccessToken = RefreshAccessToken;
