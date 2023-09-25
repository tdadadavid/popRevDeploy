"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactProjectTokenSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.transactProjectTokenSchema = {
    inputSchema: joi_1.default.object().keys({
        project_id: joi_1.default.string().required().length(36),
        amount: joi_1.default.number().required().min(1),
    }),
};
