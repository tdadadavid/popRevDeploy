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
exports.RoleService = void 0;
const core_1 = require("../../core");
class RoleService {
    constructor(dbRoles) {
        this.dbRoles = dbRoles;
        this.create = ({ input }) => __awaiter(this, void 0, void 0, function* () {
            const { roleName } = input;
            const infoMessages = {
                SUCCESS: "Role Created Successfully",
                error: "Error Creating Role",
            };
            try {
                // Check if Role Exists
                const role = yield this.dbRoles.findOne({ where: { roleName } });
                // If it Exists, Throw Duplicate Error
                if (role)
                    throw new core_1.ConflictError("Role Already Exists");
                // Create Role if it does not exist
                const newRole = yield this.dbRoles.create({
                    roleName,
                });
                core_1.logger.info(infoMessages.SUCCESS);
                return core_1.responseHandler.responseSuccess(201, infoMessages.SUCCESS, newRole);
            }
            catch (error) {
                return core_1.responseHandler.responseError(400, `${infoMessages.error} ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield this.dbRoles.findAll();
                return core_1.responseHandler.responseSuccess(201, "Roles Fetched successfully", roles);
            }
            catch (error) {
                return core_1.responseHandler.responseError(400, `Error Fetching Roles ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
    }
}
exports.RoleService = RoleService;
