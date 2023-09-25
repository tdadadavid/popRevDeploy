"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projects = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("../../../core");
const models_1 = require("../../../auth/models");
const token_1 = require("../../token");
class Projects extends sequelize_1.Model {
}
exports.Projects = Projects;
Projects.init({
    project_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
    },
    project_token_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: token_1.ProjectToken,
            key: "token_id",
        },
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
    amount_contributed: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    artist: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: models_1.Users,
            key: "id",
        },
    },
    still_accepts_contribution: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: core_1.sequelize,
    timestamps: true,
    tableName: "projects",
    modelName: "projects",
});
