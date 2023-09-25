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
exports.DecideProposal = void 0;
const core_1 = require("../../../core");
class DecideProposal {
    constructor(dbProposal, projectService) {
        this.dbProposal = dbProposal;
        this.projectService = projectService;
        this.decide = ({ input, user, }) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input)
                    throw new core_1.BadRequestError("Invalid Input");
                const { proposal_id, proposal_status } = input;
                const proposal = yield this.dbProposal.findOne({
                    where: { proposal_id },
                });
                if (!proposal)
                    throw new core_1.BadRequestError("Invalid Proposal");
                if (proposal.status !== "PENDING")
                    throw new core_1.BadRequestError("Proposal Status Already Set");
                let project;
                if (proposal_status === "ACCEPT") {
                    // Create a new project
                    project = yield this.projectService.create({
                        input: {
                            description: proposal.description,
                            estimated_funding_amount: proposal.estimated_funding_amount,
                            name: proposal.name,
                            token_value: proposal.token_value,
                        },
                        user,
                    });
                }
                yield this.dbProposal.update({
                    status: proposal_status === "ACCEPT" ? "APPROVED" : "REJECTED",
                }, { where: { proposal_id } });
                return core_1.responseHandler.responseSuccess(200, "Proposal Decided Successfully", project === null || project === void 0 ? void 0 : project.response.data);
            }
            catch (error) {
                return core_1.responseHandler.responseSuccess(400, `Error Deciding Proposal ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
    }
}
exports.DecideProposal = DecideProposal;
