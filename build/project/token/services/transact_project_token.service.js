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
exports.TransactToken = void 0;
const core_1 = require("../../../core");
const project_1 = require("../../project");
class TransactToken {
    constructor(dbProjectToken, dbProject, createTokenTransactionService) {
        this.dbProjectToken = dbProjectToken;
        this.dbProject = dbProject;
        this.createTokenTransactionService = createTokenTransactionService;
        this.makeTransaction = (input) => __awaiter(this, void 0, void 0, function* () {
            const { amount, project_id, user_id, transactionType } = input;
            // const project = await this.dbProject.findOne({
            //   where: {
            //     project_id,
            //   },
            // })
            const project = yield project_1.Projects.findOne({
                where: {
                    project_id,
                },
            });
            if (!project)
                throw new core_1.BadRequestError("Invalid Project");
            if (transactionType === "BUY" && !project.still_accepts_contribution) {
                throw new core_1.BadRequestError("This Project no longer accepts Contributions");
            }
            const token = yield this.dbProjectToken.findOne({
                where: {
                    token_id: project.project_token_id,
                },
            });
            if (!token)
                throw new core_1.BadRequestError("Invalid Project");
            if (transactionType === "BUY" && amount > token.token_in_circulation) {
                throw new core_1.BadRequestError("Amount to be bought cannot be greater than the amount of tokens in circulation");
            }
            if (transactionType === "BUY") {
                const remaining_tokens = token.token_in_circulation - amount;
                token.token_in_circulation = remaining_tokens;
                project.amount_contributed += amount * token.token_value;
                if (project.amount_contributed >= project.estimated_funding_amount)
                    project.still_accepts_contribution = false;
            }
            if (transactionType === "SELL") {
                const remaining_tokens = token.token_in_circulation + amount;
                token.token_in_circulation = remaining_tokens;
                project.amount_contributed -= amount;
            }
            yield token.save();
            yield project.save();
            const tokenTransaction = yield this.createTokenTransactionService.create({
                made_by: user_id,
                token_amount: amount,
                token_amount_value: amount * token.token_value,
                token_id: token.token_id,
                transaction_type: transactionType,
                txn_reference: `${project.name.toLocaleUpperCase()}-${this.generateRandom10DigitNumber()}.${transactionType}`,
            });
            return tokenTransaction;
        });
        this.generateRandom10DigitNumber = () => {
            return Math.floor(1000000000 + Math.random() * 9000000000).toString();
        };
    }
}
exports.TransactToken = TransactToken;
