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
exports.Logout = void 0;
const core_1 = require("../../core");
class Logout {
    constructor(dbUsers) {
        this.dbUsers = dbUsers;
        this.handle = ({ user }, res) => __awaiter(this, void 0, void 0, function* () {
            if (!user)
                throw new core_1.ConflictError("User not found");
            try {
                const currentUser = yield this.dbUsers.findOne({
                    where: { id: user.id },
                });
                if (!currentUser)
                    throw new core_1.UnAuthorizedError("Unauthorized");
                yield this.dbUsers.update({ refreshToken: "" }, { where: { id: user.id } });
                core_1.cookieHandler.clearHttpOnlyCookie({ cookieName: "accessToken", res });
                core_1.cookieHandler.clearHttpOnlyCookie({ cookieName: "refreshToken", res });
                return core_1.responseHandler.responseSuccess(204, "Logged out Successfully");
            }
            catch (error) {
                return core_1.responseHandler.responseSuccess(400, `Error Logging Out ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
    }
}
exports.Logout = Logout;
