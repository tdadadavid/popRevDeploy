"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthorizedError = void 0;
const utils_1 = require("../utils");
const apiError_1 = require("./apiError");
class UnAuthorizedError extends apiError_1.ApiError {
    constructor(message, details) {
        super(message);
        this._statusCode = utils_1.HttpStatus.UNAUTHORIZED;
        this._details = null;
        this._message = message;
        this._statusCode = utils_1.HttpStatus.UNAUTHORIZED;
        Object.setPrototypeOf(this, UnAuthorizedError.prototype);
    }
    get statusCode() {
        return this._statusCode;
    }
    get message() {
        return this._message;
    }
    get details() {
        return this._details;
    }
}
exports.UnAuthorizedError = UnAuthorizedError;
