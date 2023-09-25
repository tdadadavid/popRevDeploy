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
exports.userService = void 0;
const core_1 = require("../core");
const project_1 = require("../project");
const token_1 = require("../project/token");
const wallet_service_1 = require("./wallet/services/wallet.service");
class UserService {
    constructor(dbProjects, walletService) {
        this.dbProjects = dbProjects;
        this.walletService = walletService;
        this.sellToken = ({ input, user, }) => __awaiter(this, void 0, void 0, function* () {
            if (!input) {
                throw new core_1.BadRequestError("Invalid Input");
            }
            if (!user) {
                throw new core_1.UnAuthorizedError("Unauthorized");
            }
            const { amount, project_id } = input;
            if (amount < 1) {
                throw new core_1.BadRequestError("Amount cannot be less than 1");
            }
            const project = yield this.dbProjects.findOne({ where: { project_id } });
            if (!project) {
                throw new core_1.BadRequestError("Invalid Project");
            }
            const transaction = yield core_1.sequelize.transaction();
            try {
                yield this.walletService.doesUserHaveSufficientBalance(user.id, amount, project.project_token_id);
                const newTransaction = yield token_1.transactToken.makeTransaction({
                    amount,
                    project_id,
                    user_id: user.id,
                    transactionType: "SELL",
                });
                const user_wallet_information = yield this.walletService.get_user_wallet_token(user.id, project.project_token_id);
                if (user_wallet_information) {
                    if (user_wallet_information.token_owned_amount === amount) {
                        user_wallet_information.destroy();
                    }
                    else {
                        user_wallet_information.token_owned_amount -= amount;
                    }
                    user_wallet_information === null || user_wallet_information === void 0 ? void 0 : user_wallet_information.save();
                }
                transaction.commit();
                return core_1.responseHandler.responseSuccess(200, "Transaction Successful", newTransaction);
            }
            catch (error) {
                console.log(error);
                transaction.rollback();
                return core_1.responseHandler.responseError(400, `Transaction Failed ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
        this.buyToken = ({ input, user, }) => __awaiter(this, void 0, void 0, function* () {
            if (!input) {
                throw new core_1.BadRequestError("Invalid Input");
            }
            if (!user) {
                throw new core_1.UnAuthorizedError("Unauthorized");
            }
            const { amount, project_id } = input;
            if (amount < 1) {
                throw new core_1.BadRequestError("Amount cannot be less than 1");
            }
            const project = yield this.dbProjects.findOne({ where: { project_id } });
            if (!project) {
                throw new core_1.BadRequestError("Invalid Project");
            }
            const transaction = yield core_1.sequelize.transaction();
            try {
                const newTransaction = yield token_1.transactToken.makeTransaction({
                    amount,
                    project_id,
                    user_id: user.id,
                    transactionType: "BUY",
                });
                const user_wallet_information = yield this.walletService.get_user_wallet_token(user.id, project.project_token_id);
                if (!user_wallet_information) {
                    yield this.walletService.addNewWalletToken({
                        amount,
                        token_id: project.project_token_id,
                        user_id: user.id,
                    });
                }
                else {
                    user_wallet_information.token_owned_amount += amount;
                    user_wallet_information === null || user_wallet_information === void 0 ? void 0 : user_wallet_information.save();
                }
                transaction.commit();
                return core_1.responseHandler.responseSuccess(200, "Transaction Successful", newTransaction);
            }
            catch (error) {
                transaction.rollback();
                return core_1.responseHandler.responseError(400, `Transaction Failed ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
        this.getUserWallet = ({ user }) => __awaiter(this, void 0, void 0, function* () {
            if (!user) {
                throw new core_1.UnAuthorizedError("Unauthorized");
            }
            const user_wallet = yield this.walletService.get_user_wallet(user.id);
            return core_1.responseHandler.responseSuccess(200, "Wallet Retrieved Successfully", user_wallet);
        });
    }
    getTokenTransactionsForUser({ user }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!user) {
                    throw new core_1.UnAuthorizedError("Unauthorized");
                }
                const allTransactions = yield token_1.getTokenTransaction.getTokenTransactionForUser(user.id);
                return core_1.responseHandler.responseSuccess(200, "Found Transactions", allTransactions);
            }
            catch (error) {
                return core_1.responseHandler.responseError(400, `Failed to Find Transactions ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
    }
}
exports.userService = new UserService(project_1.Projects, wallet_service_1.walletService);
