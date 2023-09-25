"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const moment_1 = __importDefault(require("moment"));
//TODO: work on the limiting.
exports.globalRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: (0, moment_1.default)().add(12, 'hours').unix(),
    max: 100,
    message: 'You have exceeded the 100 requests in 24 hrs limit!',
    standardHeaders: true,
    legacyHeaders: false,
});
