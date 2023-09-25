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
exports.ErrorHandler = void 0;
const errors_1 = require("../errors");
const logging_1 = require("../logging");
const utils_1 = require("../utils");
class ErrorHandler {
    constructor() {
        this.handle = (error, _, res, __) => __awaiter(this, void 0, void 0, function* () {
            let statusCode = utils_1.HttpStatus.INTERNAL_SERVER_ERROR;
            let message = 'internal server error';
            if (error instanceof errors_1.ApiError) {
                logging_1.logger.error('Error in middleware', error);
                statusCode = error.statusCode;
                message = error.message;
            }
            if (statusCode == utils_1.HttpStatus.INTERNAL_SERVER_ERROR)
                logging_1.logger.error(error);
            res.status(statusCode).send({ status: false, error: message });
        });
    }
}
exports.ErrorHandler = ErrorHandler;
