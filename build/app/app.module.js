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
exports.startApp = void 0;
const http_1 = require("http");
const core_1 = require("../core");
const app_service_1 = require("./app.service");
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = (0, http_1.createServer)(app_service_1.app);
    server.listen(core_1.config.port, () => {
        core_1.logger.info(`Server started successfully on port ${core_1.config.port}`);
    });
});
exports.startApp = startApp;
