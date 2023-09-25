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
exports.CreateProject = void 0;
const core_1 = require("../../../core");
class CreateProject {
    constructor(dbProjects, createTokenService) {
        this.dbProjects = dbProjects;
        this.createTokenService = createTokenService;
        this.create = ({ input, user }) => __awaiter(this, void 0, void 0, function* () {
            if (!input)
                throw new core_1.BadRequestError("Invalid Input");
            if (!user)
                throw new core_1.UnAuthorizedError("Unauthorized");
            const { name, description, estimated_funding_amount, token_value } = input;
            if (estimated_funding_amount < 1 || token_value < 1)
                throw new core_1.BadRequestError("Invalid Input");
            const duplicateProject = yield this.dbProjects.findOne({ where: { name } });
            if (duplicateProject)
                throw new Error("Project Already Exists");
            if (token_value > estimated_funding_amount)
                throw new core_1.BadRequestError("Token cannot be greater than fund amount");
            // Create Project Token
            const project_token = yield this.createTokenService.create({
                token_in_circulation: this.calculate_token_in_circulation({
                    token_value,
                    estimated_funding_amount,
                }),
                token_name: this.create_token_name(name),
                token_value: token_value,
            });
            const createdProject = yield this.dbProjects.create({
                artist: user.id,
                amount_contributed: 0,
                description,
                estimated_funding_amount,
                name,
                project_token_id: project_token.token_id,
            });
            return core_1.responseHandler.responseSuccess(201, "Project Created Successfully", {
                project: createdProject,
                token: project_token,
            });
        });
        this.create_token_name = (project_name) => {
            return `${project_name.replace(/ /g, "_").toLocaleLowerCase()}_token`;
        };
        this.calculate_token_in_circulation = ({ estimated_funding_amount, token_value, }) => {
            const token_in_circulation = Math.floor(estimated_funding_amount / token_value);
            return token_in_circulation;
        };
    }
}
exports.CreateProject = CreateProject;
