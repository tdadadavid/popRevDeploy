"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const config_1 = require("../config");
exports.logger = config_1.config.appEnvironment === "production"
    ? (0, config_1.prodDevLogger)()
    : (0, config_1.buildDevLogger)();
