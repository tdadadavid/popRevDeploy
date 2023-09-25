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
exports.SignUp = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("../../core");
class SignUp {
    constructor(dbUser, dbRoles, walletService) {
        this.dbUser = dbUser;
        this.dbRoles = dbRoles;
        this.walletService = walletService;
        this.checkIfRoleExists = (role_id) => __awaiter(this, void 0, void 0, function* () {
            const role = yield this.dbRoles.findOne({ where: { role_id } });
            if (!role)
                return false;
            return role;
        });
        this.handle = ({ input }) => __awaiter(this, void 0, void 0, function* () {
            // Extract email and password from input
            if (!input)
                throw new core_1.ConflictError("No Input");
            const { password, phoneNumber, roleId, email, firstName, lastName } = input;
            try {
                // Find the user by email and throw error if user exists
                const userExists = yield this.dbUser.findOne({
                    where: {
                        [sequelize_1.Op.or]: [{ email }, { phoneNumber }],
                    },
                });
                if (userExists) {
                    throw new core_1.UnAuthorizedError("User Already Exists");
                }
                // Check if the Role Exists
                const isRoleValid = yield this.checkIfRoleExists(roleId);
                if (!isRoleValid)
                    throw new core_1.ConflictError("Role Not Found");
                //Hash provided password
                const hashPassword = yield (0, core_1.hashData)(password);
                // Prepare Payload to be stored in the DB
                const data = {
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    roleId,
                    password: hashPassword,
                };
                // Create the User
                const newUser = yield this.dbUser.create(data);
                yield this.walletService.create_wallet(newUser.id);
                delete newUser.password;
                // Return a successful response using the ResponseHandler utility
                return core_1.responseHandler.responseSuccess(201, "User Created successfully", newUser);
            }
            catch (error) {
                return core_1.responseHandler.responseError(400, `Error Creating User ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
    }
}
exports.SignUp = SignUp;
