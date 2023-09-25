"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signUpSchema = {
    inputSchema: joi_1.default.object().keys({
        firstName: joi_1.default.string()
            .min(2)
            .max(50)
            .required()
            .label("First name is required and must be between 2 and 50 characters"),
        lastName: joi_1.default.string()
            .min(2)
            .max(50)
            .required()
            .label("Last name is required and must be between 2 and 50 characters"),
        email: joi_1.default.string()
            .email({ tlds: { allow: false } })
            .required()
            .label("Valid email is required"),
        password: joi_1.default.string()
            .min(8)
            .required()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/)
            .label("Password is required and must be at least 8 characters. It should include at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&+=!)."),
        roleId: joi_1.default.string()
            .length(36)
            .required()
            .label("Role ID is required and must be exactly 36 characters"),
        phoneNumber: joi_1.default.string()
            .regex(/^\+234\d{10}$/)
            .required()
            .label("Valid phone number is required"),
    }),
};
