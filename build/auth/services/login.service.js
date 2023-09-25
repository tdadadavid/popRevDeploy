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
exports.Login = void 0;
const core_1 = require("../../core");
class Login {
    constructor(dbUser, tokenService) {
        this.dbUser = dbUser;
        this.tokenService = tokenService;
        this.handle = ({ input }, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            try {
                // Find the user by email
                const user = yield this.dbUser.scope('withPassword').findOne({
                    where: { email },
                });
                if (!user)
                    throw new core_1.UnAuthorizedError("Invalid login credentials");
                const isValid = yield (0, core_1.compareHashedData)(password, user.password);
                if (!isValid)
                    throw new core_1.UnAuthorizedError("Invalid login credentials");
                const refreshToken = this.tokenService.createAndEncryptRefreshToken({
                    id: user.id,
                });
                const accessToken = this.tokenService.createAndEncryptAccessToken({
                    id: user.id,
                    role: "",
                    refreshToken,
                });
                // Store RefreshToken in Db
                yield this.dbUser.update({ refreshToken, refreshTokenExp: new Date() }, { where: { email } });
                core_1.cookieHandler.saveToHttpOnlyCookie({
                    cookieName: "refreshToken",
                    data: refreshToken,
                    res,
                });
                core_1.cookieHandler.saveToHttpOnlyCookie({
                    cookieName: "accessToken",
                    data: accessToken,
                    res,
                });
                delete user.password;
                core_1.logger.info("Logged In Successfully");
                return core_1.responseHandler.responseSuccess(200, "Logged In Successfully", {
                    user,
                });
            }
            catch (error) {
                return core_1.responseHandler.responseError(400, `Error Logging In ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
    }
}
exports.Login = Login;
