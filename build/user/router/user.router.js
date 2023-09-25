"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_service_1 = require("../user.service");
const schema_1 = require("./schema");
const controlBuilder_1 = require("../../core/middlewares/controlBuilder");
exports.userRouter = (0, express_1.Router)();
exports.userRouter
    .get("/wallet", controlBuilder_1.ControlBuilder.builder()
    .setHandler(user_service_1.userService.getUserWallet)
    .isPrivate()
    .only("USER")
    .handle())
    .get("/token-transactions", controlBuilder_1.ControlBuilder.builder()
    .setHandler(user_service_1.userService.getTokenTransactionsForUser)
    .isPrivate()
    .only("USER")
    .handle())
    .post("/buy-project-token", controlBuilder_1.ControlBuilder.builder()
    .setHandler(user_service_1.userService.buyToken)
    .isPrivate()
    .only("USER")
    .setValidator(schema_1.transactProjectTokenSchema)
    .handle())
    .post("/sell-project-token", controlBuilder_1.ControlBuilder.builder()
    .setHandler(user_service_1.userService.sellToken)
    .isPrivate()
    .only("USER")
    .setValidator(schema_1.transactProjectTokenSchema)
    .handle());
