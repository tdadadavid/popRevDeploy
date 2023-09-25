"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenTransactions = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("../../../core");
const models_1 = require("../../../auth/models");
const token_model_1 = require("./token.model");
class TokenTransactions extends sequelize_1.Model {
}
exports.TokenTransactions = TokenTransactions;
TokenTransactions.init({
    transaction_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
    },
    token_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: token_model_1.ProjectToken,
            key: "token_id",
        },
    },
    transaction_type: {
        type: sequelize_1.DataTypes.ENUM,
        allowNull: false,
        values: ["BUY", "SELL"],
    },
    txn_reference: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    token_amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    token_amount_value: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    made_by: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: models_1.Users,
            key: "id",
        },
    },
}, {
    sequelize: core_1.sequelize,
    timestamps: true,
    tableName: "token_transactions",
    modelName: "token_transactions",
});
