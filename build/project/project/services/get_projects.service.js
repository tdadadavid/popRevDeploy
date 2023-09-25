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
exports.GetProjects = void 0;
const core_1 = require("../../../core");
const token_1 = require("../../token");
class GetProjects {
    constructor(dbProjects) {
        this.dbProjects = dbProjects;
        this.find_active_projects = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const active_projects = yield this.dbProjects.findAll({
                    where: { still_accepts_contribution: true },
                    include: [
                        {
                            model: token_1.ProjectToken,
                            as: "projectToken",
                            attributes: [
                                "token_id",
                                "token_name",
                                "token_value",
                                "token_in_circulation",
                            ],
                        },
                    ],
                });
                return core_1.responseHandler.responseSuccess(200, "Project Found Successfully", active_projects);
            }
            catch (error) {
                return core_1.responseHandler.responseError(400, `Error Finding Projects ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
        this.find_all_projects = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const active_projects = yield this.dbProjects.findAll();
                return core_1.responseHandler.responseSuccess(200, "Project Found Successfully", active_projects);
            }
            catch (error) {
                return core_1.responseHandler.responseError(400, `Error Finding Projects ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
    }
}
exports.GetProjects = GetProjects;
