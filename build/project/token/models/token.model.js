"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectToken = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("../../../core");
class ProjectToken extends sequelize_1.Model {
}
exports.ProjectToken = ProjectToken;
ProjectToken.init({
    token_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
    },
    token_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    token_value: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    token_in_circulation: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize: core_1.sequelize,
    timestamps: true,
    tableName: "project_token",
    modelName: "project_token",
});
