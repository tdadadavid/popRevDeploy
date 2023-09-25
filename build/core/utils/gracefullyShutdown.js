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
exports.gracefullyShutdown = void 0;
const logging_1 = require("../logging");
const gracefullyShutdown = (error) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.logger.error("UNEXPECTED_APP_ERROR", error);
    process.exit(1);
});
exports.gracefullyShutdown = gracefullyShutdown;
