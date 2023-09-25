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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const core_1 = require("../../core");
const models_1 = require("../models");
class TokenService {
    constructor(encryptor, dbUser) {
        this.encryptor = encryptor;
        this.dbUser = dbUser;
        this.createAndEncryptAccessToken = (payload) => {
            const { accessTokenExpiresIn, accessTokenSecret } = core_1.config.auth;
            const token = jsonwebtoken_1.default.sign(payload, accessTokenSecret, {
                expiresIn: accessTokenExpiresIn,
            });
            return this.encryptor.encryptString(token);
        };
        this.isAccessTokenValid = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { accessTokenSecret } = core_1.config.auth;
                const userPayload = jsonwebtoken_1.default.verify(token, accessTokenSecret);
                if (!userPayload)
                    return false;
                const user = yield this.dbUser.scope("withRefreshToken").findOne({
                    where: { id: userPayload.id },
                    include: [
                        {
                            model: models_1.Roles,
                            as: "role",
                            attributes: ["roleName"],
                        },
                    ],
                });
                if (!user)
                    return false;
                if (userPayload.refreshToken !== user.refreshToken)
                    return false;
                return {
                    id: user.id,
                    role: user === null || user === void 0 ? void 0 : user.role.roleName,
                    refreshToken: userPayload.refreshToken,
                };
            }
            catch (error) {
                return false;
            }
        });
        this.isRefreshTokenValid = (token) => __awaiter(this, void 0, void 0, function* () {
            const { refreshTokenSecret } = core_1.config.auth;
            const userPayload = jsonwebtoken_1.default.verify(token, refreshTokenSecret);
            if (!userPayload)
                return false;
            const user = yield this.dbUser.scope("withRefreshToken").findOne({
                where: { id: userPayload.id },
            });
            if (!user)
                return false;
            return user;
        });
        this.decryptToken = (token) => {
            const decryptedToken = this.encryptor.decrypt(token);
            if (!decryptedToken)
                return;
            return decryptedToken;
        };
    }
    createAndEncryptRefreshToken(payload) {
        const { refreshTokenExpiresIn, refreshTokenSecret } = core_1.config.auth;
        const token = jsonwebtoken_1.default.sign(payload, refreshTokenSecret, {
            expiresIn: refreshTokenExpiresIn,
        });
        return this.encryptor.encryptString(token);
    }
}
exports.TokenService = TokenService;
