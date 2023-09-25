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
exports.GetTokenTransaction = void 0;
const core_1 = require("../../../core");
class GetTokenTransaction {
    constructor(dbProjectTokenTransaction) {
        this.dbProjectTokenTransaction = dbProjectTokenTransaction;
        this.getTokenTransactions = () => __awaiter(this, void 0, void 0, function* () {
            const allTokenTransaction = yield this.dbProjectTokenTransaction.findAll();
            return core_1.responseHandler.responseSuccess(200, "All Token Transactions", allTokenTransaction);
        });
        this.getTokenTransactionForUser = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const tokenTransaction = yield this.dbProjectTokenTransaction.findAll({
                where: {
                    made_by: user_id,
                },
            });
            return tokenTransaction;
        });
    }
}
exports.GetTokenTransaction = GetTokenTransaction;
