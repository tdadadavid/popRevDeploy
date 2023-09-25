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
exports.AuthGuard = void 0;
class AuthGuard {
    constructor(tokenService) {
        this.tokenService = tokenService;
        this.guard = (cookies) => __awaiter(this, void 0, void 0, function* () {
            const cookieAccessToken = cookies === null || cookies === void 0 ? void 0 : cookies.accessToken;
            if (!cookieAccessToken)
                return false;
            const accessToken = this.tokenService.decryptToken(cookieAccessToken);
            if (!accessToken)
                return false;
            const user = yield this.tokenService.isAccessTokenValid(accessToken);
            if (!user)
                return false;
            return user;
        });
    }
}
exports.AuthGuard = AuthGuard;
