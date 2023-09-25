"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
class ResponseHandler {
    constructor() {
        /**
         * Error Response Handler
         * @param {Numher} Status Code
         * @param {string} message
         * @returns {{response: {code: *, message: *, status: boolean}, statusCode: *}}
         */
        this.responseError = (statusCode, message) => {
            return {
                statusCode,
                response: {
                    code: statusCode,
                    message,
                    status: false,
                },
            };
        };
        /**
         * Successful Response Handler
         * @param {Numher} Status Code
         * @param {string} message
         * @param {any} data
         * @returns {{response: {code: *, message: *, status: boolean, data: *}, statusCode: *}}
         */
        this.responseSuccess = (statusCode, message, data = {}) => {
            return {
                statusCode,
                response: {
                    code: statusCode,
                    status: true,
                    message,
                    data,
                },
            };
        };
    }
}
exports.ResponseHandler = ResponseHandler;
