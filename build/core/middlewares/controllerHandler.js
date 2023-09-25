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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerHandler = void 0;
const utils_1 = require("../utils");
const errors_1 = require("../errors");
const services_1 = require("../../auth/services");
class ControllerHandler {
    constructor() {
        this.handle = (controllerFn, schema = {}, options) => {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (options === null || options === void 0 ? void 0 : options.isPrivate) {
                        yield this.validateRequest(req, options);
                    }
                    const controllerArgs = utils_1.parseControllerArgs.parse(req);
                    const { input, params, query } = controllerArgs;
                    if (schema) {
                        const { querySchema, paramsSchema, inputSchema } = schema;
                        try {
                            if (inputSchema)
                                (0, utils_1.joiValidate)(inputSchema, input);
                            if (querySchema)
                                (0, utils_1.joiValidate)(querySchema, query);
                            if (paramsSchema)
                                (0, utils_1.joiValidate)(paramsSchema, params);
                        }
                        catch (error) {
                            throw new errors_1.UnProcessableError(error.message.replaceAll('"', ""));
                        }
                    }
                    const controllerResult = yield controllerFn(controllerArgs, res, req);
                    if (!controllerResult) {
                        res.status(utils_1.HttpStatus.OK).send({ status: true });
                        return;
                    }
                    const { statusCode } = controllerResult, data = __rest(controllerResult, ["statusCode"]);
                    res.status(statusCode !== null && statusCode !== void 0 ? statusCode : utils_1.HttpStatus.OK).send(data);
                }
                catch (error) {
                    next(error);
                }
            });
        };
    }
    validateRequest(req, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const isRequestAllowed = yield services_1.authGuard.guard(req.cookies);
            if (!isRequestAllowed)
                throw new errors_1.UnAuthorizedError("Unauthorized");
            if ((options === null || options === void 0 ? void 0 : options.allowedRoles) && options.allowedRoles.length > 0) {
                const isRequestAuthorized = (_a = options.allowedRoles) === null || _a === void 0 ? void 0 : _a.includes(isRequestAllowed.role.toLocaleUpperCase());
                if (!isRequestAuthorized)
                    throw new errors_1.UnAuthorizedError("Unauthorized");
            }
            req.user = isRequestAllowed;
        });
    }
}
exports.ControllerHandler = ControllerHandler;
