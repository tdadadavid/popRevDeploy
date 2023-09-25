"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("../../../core");
const models_1 = require("../../../auth/models");
class Wallet extends sequelize_1.Model {
}
exports.Wallet = Wallet;
Wallet.init({
    wallet_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
    },
    wallet_owner_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: models_1.Users,
            key: "id",
        },
    },
}, {
    sequelize: core_1.sequelize,
    timestamps: true,
    tableName: "wallets",
    modelName: "wallets",
});
