"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decideProposalSchema = exports.createProposalSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProposalSchema = {
    inputSchema: joi_1.default.object().keys({
        name: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        estimated_funding_amount: joi_1.default.number().required().min(1),
        token_value: joi_1.default.number().required().min(1),
    }),
};
exports.decideProposalSchema = {
    inputSchema: joi_1.default.object().keys({
        proposal_id: joi_1.default.string().required().length(36),
        proposal_status: joi_1.default.string().required().valid("ACCEPT", "REJECT"),
    }),
};
