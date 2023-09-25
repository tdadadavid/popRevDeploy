"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proposal = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("../../../core");
class Proposal extends sequelize_1.Model {
}
exports.Proposal = Proposal;
Proposal.init({
    proposal_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 100,
        },
    },
    estimated_funding_amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    token_value: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("REJECTED", "APPROVED", "PENDING"),
        allowNull: true,
        defaultValue: "PENDING",
    },
    artist: {
        type: sequelize_1.DataTypes.UUID,
        // references: {
        //   model: User,
        //   key: "id",
        // },
    },
}, {
    sequelize: core_1.sequelize,
    timestamps: true,
    tableName: "proposals",
    modelName: "proposals",
});
