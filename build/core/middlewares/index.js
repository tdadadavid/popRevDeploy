"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieHandler = exports.responseHandler = exports.notFoundHandler = exports.errorHandler = void 0;
const errorhandler_1 = require("./errorhandler");
const cookieHandler_1 = require("./cookieHandler");
const notFoundErrorHandler_1 = require("./notFoundErrorHandler");
const responseHandler_1 = require("./responseHandler");
exports.errorHandler = new errorhandler_1.ErrorHandler();
exports.notFoundHandler = new notFoundErrorHandler_1.NotFoundErrorHandler();
exports.responseHandler = new responseHandler_1.ResponseHandler();
exports.cookieHandler = new cookieHandler_1.CookieHandler();
