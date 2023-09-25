"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletToken = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("../../../core");
const wallet_model_1 = require("./wallet.model");
const token_1 = require("../../../project/token");
class WalletToken extends sequelize_1.Model {
}
exports.WalletToken = WalletToken;
WalletToken.init({
    wallet_information_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
    },
    wallet_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: wallet_model_1.Wallet,
            key: "wallet_id",
        },
    },
    token_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: token_1.ProjectToken,
            key: "token_id",
        },
    },
    token_owned_amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize: core_1.sequelize,
    timestamps: true,
    tableName: "wallet_tokens",
    modelName: "wallet_tokens",
});
