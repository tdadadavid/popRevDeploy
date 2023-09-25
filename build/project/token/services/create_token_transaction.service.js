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
exports.CreateTokenTransaction = void 0;
const core_1 = require("../../../core");
class CreateTokenTransaction {
    constructor(dbProjectToken, dbProjectTokenTransaction) {
        this.dbProjectToken = dbProjectToken;
        this.dbProjectTokenTransaction = dbProjectTokenTransaction;
        this.create = (transaction_info) => __awaiter(this, void 0, void 0, function* () {
            const { made_by, token_amount, token_amount_value, token_id, transaction_type, txn_reference, } = transaction_info;
            const token = yield this.dbProjectToken.findOne({
                where: {
                    token_id,
                },
            });
            if (!token)
                throw new core_1.BadRequestError("Invalid Token");
            const tokenTransaction = yield this.dbProjectTokenTransaction.findOne({
                where: {
                    txn_reference,
                },
            });
            if (tokenTransaction)
                throw new core_1.BadRequestError("Transaction already Exists");
            const createdTransaction = yield this.dbProjectTokenTransaction.create({
                made_by,
                token_amount,
                token_amount_value,
                token_id,
                transaction_type,
                txn_reference,
            });
            return createdTransaction;
        });
    }
}
exports.CreateTokenTransaction = CreateTokenTransaction;
