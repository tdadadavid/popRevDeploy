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
exports.GetAuthUser = void 0;
const core_1 = require("../../core");
class GetAuthUser {
    constructor(dbUser) {
        this.dbUser = dbUser;
        this.handle = ({ user }) => __awaiter(this, void 0, void 0, function* () {
            // Extract email and password from input
            if (!user)
                throw new core_1.UnAuthorizedError("Unauthorized");
            try {
                // Find the user by email and throw error if user exists
                const currentUser = yield this.dbUser.findOne({
                    where: {
                        id: user.id,
                    },
                });
                if (!currentUser) {
                    throw new core_1.UnAuthorizedError("Invalid User");
                }
                // Return a successful response using the ResponseHandler utility
                return core_1.responseHandler.responseSuccess(200, "User Found successfully", currentUser);
            }
            catch (error) {
                return core_1.responseHandler.responseError(400, `Error Finding User ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
    }
}
exports.GetAuthUser = GetAuthUser;
