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
exports.CreateProjectToken = void 0;
const core_1 = require("../../../core");
class CreateProjectToken {
    constructor(dbProjectToken) {
        this.dbProjectToken = dbProjectToken;
        this.create = (token_info) => __awaiter(this, void 0, void 0, function* () {
            const { token_in_circulation, token_name, token_value } = token_info;
            const token = yield this.dbProjectToken.findOne({
                where: {
                    token_name,
                },
            });
            if (token)
                throw new core_1.BadRequestError("Token already Exists");
            const createdToken = yield this.dbProjectToken.create({
                token_in_circulation,
                token_name,
                token_value,
            });
            return createdToken;
        });
    }
}
exports.CreateProjectToken = CreateProjectToken;
