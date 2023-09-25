"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("../../core");
const role_model_1 = require("./role.model");
class Users extends sequelize_1.Model {
}
exports.Users = Users;
Users.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.UUIDV4,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    refreshToken: {
        type: sequelize_1.DataTypes.STRING(400),
        allowNull: true,
    },
    refreshTokenExp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    roleId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: role_model_1.Roles,
            key: "role_id",
        },
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    defaultScope: {
        attributes: {
            exclude: ["password", "refreshToken", "refreshTokenExp"],
        },
    },
    scopes: {
        withPassword: {
            attributes: {
                include: ["password"],
            },
        },
        withRefreshToken: {
            attributes: {
                include: ["refreshToken", "refreshTokenExp"],
            },
        },
    },
    modelName: "users",
    tableName: "users",
    sequelize: core_1.sequelize,
    timestamps: true,
    freezeTableName: true,
});
