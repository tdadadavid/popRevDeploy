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
exports.walletService = exports.WalletService = void 0;
const core_1 = require("../../../core");
const token_1 = require("../../../project/token");
const wallet_model_1 = require("../models/wallet.model");
const wallet_token_1 = require("../models/wallet_token");
class WalletService {
    constructor(dbWallet, dbWalletInformation) {
        this.dbWallet = dbWallet;
        this.dbWalletInformation = dbWalletInformation;
        this.create_wallet = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const wallet = yield this.dbWallet.findOne({
                where: { wallet_owner_id: user_id },
            });
            if (wallet) {
                throw new core_1.BadRequestError("User Cannot have more than one Wallet");
            }
            const newWallet = yield this.dbWallet.create({
                wallet_owner_id: user_id,
            });
        });
        this.get_user_wallet = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const user_wallet = yield this.dbWallet.findOne({
                where: {
                    wallet_owner_id: user_id,
                },
            });
            if (!user_wallet) {
                throw new core_1.BadRequestError("User does not have a wallet");
            }
            const user_wallet_token = yield this.dbWalletInformation.findAll({
                where: {
                    wallet_id: user_wallet.wallet_id,
                },
                include: [
                    {
                        model: token_1.ProjectToken,
                        as: "projectToken",
                        attributes: ["token_name", "token_value", "token_id"],
                    },
                ],
            });
            return { wallet: user_wallet, wallet_tokens: user_wallet_token };
        });
        this.get_user_wallet_token = (user_id, token_id) => __awaiter(this, void 0, void 0, function* () {
            const { wallet } = yield this.get_user_wallet(user_id);
            const user_wallet_token = yield this.dbWalletInformation.findOne({
                where: {
                    wallet_id: wallet.wallet_id,
                    token_id,
                },
            });
            return user_wallet_token;
        });
        this.addNewWalletToken = (input) => __awaiter(this, void 0, void 0, function* () {
            const { amount, token_id, user_id } = input;
            const { wallet } = yield this.get_user_wallet(user_id);
            const user_wallet_token = yield this.get_user_wallet_token(user_id, token_id);
            if (user_wallet_token) {
                throw new core_1.BadRequestError("Token Exists in Wallet");
            }
            const new_wallet_token = yield this.dbWalletInformation.create({
                wallet_id: wallet.wallet_id,
                token_owned_amount: amount,
                token_id,
            });
            return new_wallet_token;
        });
    }
    doesUserHaveSufficientBalance(user_id, amount, token_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_wallet_information = yield this.get_user_wallet_token(user_id, token_id);
            if (!user_wallet_information) {
                throw new core_1.BadRequestError("User does not have contributions to this Token");
            }
            if (user_wallet_information.token_owned_amount < amount) {
                throw new core_1.BadRequestError("Insufficient Balance");
            }
            return true;
        });
    }
}
exports.WalletService = WalletService;
exports.walletService = new WalletService(wallet_model_1.Wallet, wallet_token_1.WalletToken);
