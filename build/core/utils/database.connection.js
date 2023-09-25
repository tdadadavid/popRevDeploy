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
exports.initializeDbConnection = void 0;
const models_1 = require("../../auth/models");
const project_1 = require("../../project");
const proposals_1 = require("../../project/proposals");
const token_1 = require("../../project/token");
const wallet_model_1 = require("../../user/wallet/models/wallet.model");
const wallet_token_1 = require("../../user/wallet/models/wallet_token");
const config_1 = require("../config");
const logging_1 = require("../logging");
const initializeDbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield config_1.sequelize.authenticate();
    logging_1.logger.info("Connection has been established successfully.");
    yield config_1.sequelize.sync();
    logging_1.logger.info("All models were synchronized successfully.");
    yield handleSeedDatabase();
    logging_1.logger.info("Seeding Completed Successfully");
    yield handleSetAssociations();
    logging_1.logger.info("Associations Set Successfully");
});
exports.initializeDbConnection = initializeDbConnection;
const handleSeedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const allRoles = yield models_1.Roles.findAll();
    if (allRoles.length === 0) {
        const initialRoles = [
            { roleName: models_1.UserRoles.ADMIN },
            { roleName: models_1.UserRoles.USER },
            { roleName: models_1.UserRoles.ARTIST },
        ];
        yield models_1.Roles.bulkCreate(initialRoles);
    }
});
const handleSetAssociations = () => __awaiter(void 0, void 0, void 0, function* () {
    models_1.Users.belongsTo(models_1.Roles, {
        foreignKey: "roleId",
        as: "role",
    });
    // Project to Project Token Association
    project_1.Projects.belongsTo(token_1.ProjectToken, {
        foreignKey: "project_token_id",
        as: "projectToken",
    });
    // Project to User (Artist) Association
    project_1.Projects.belongsTo(models_1.Users, {
        foreignKey: "artist",
        as: "artistInfo",
    });
    // Token Transaction to Project Token Association
    token_1.TokenTransactions.belongsTo(token_1.ProjectToken, {
        foreignKey: "token_id",
        as: "projectToken",
    });
    // Token Transaction to User (Made By) Association
    token_1.TokenTransactions.belongsTo(models_1.Users, {
        foreignKey: "made_by",
        as: "madeBy",
    });
    // Proposal to User (Artist) Association
    proposals_1.Proposal.belongsTo(models_1.Users, {
        foreignKey: "artist",
        as: "artistInfo",
    });
    // Wallet to User (Wallet Owner) Association
    wallet_model_1.Wallet.belongsTo(models_1.Users, {
        foreignKey: "wallet_owner_id",
        as: "walletOwner",
    });
    // Wallet Token to Wallet Association
    wallet_token_1.WalletToken.belongsTo(wallet_model_1.Wallet, {
        foreignKey: "wallet_id",
        as: "walletToken",
    });
    // Wallet Information to Project Token Association
    wallet_token_1.WalletToken.belongsTo(token_1.ProjectToken, {
        foreignKey: "token_id",
        as: "projectToken",
    });
});
