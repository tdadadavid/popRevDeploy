"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = exports.Roles = void 0;
const sequelize_1 = require("sequelize");
const core_1 = require("../../core");
class Roles extends sequelize_1.Model {
}
exports.Roles = Roles;
Roles.init({
    role_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.UUIDV4,
    },
    roleName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    modelName: "roles",
    tableName: "roles",
    sequelize: core_1.sequelize,
    timestamps: true,
    freezeTableName: true,
});
var UserRoles;
(function (UserRoles) {
    UserRoles["USER"] = "user";
    UserRoles["ADMIN"] = "admin";
    UserRoles["ARTIST"] = "artist";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
