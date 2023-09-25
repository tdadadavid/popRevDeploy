"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const schema_1 = require("./schema");
const services_1 = require("../services");
const controlBuilder_1 = require("../../core/middlewares/controlBuilder");
exports.authRouter = (0, express_1.Router)();
exports.authRouter
    .get("/user", controlBuilder_1.ControlBuilder.builder()
    .setHandler(services_1.getAuthUser.handle)
    .isPrivate()
    .handle())
    .post("/login", controlBuilder_1.ControlBuilder.builder()
    .setHandler(services_1.login.handle)
    .setValidator(schema_1.loginSchema)
    .handle())
    .post("/signup", controlBuilder_1.ControlBuilder.builder()
    .setHandler(services_1.signup.handle)
    .setValidator(schema_1.signUpSchema)
    .handle())
    .post("/logout", controlBuilder_1.ControlBuilder.builder()
    .setHandler(services_1.logout.handle)
    .isPrivate()
    .handle())
    .get("/roles", controlBuilder_1.ControlBuilder.builder().setHandler(services_1.roleService.findAll).handle())
    .get("/refresh-token", controlBuilder_1.ControlBuilder.builder().setHandler(services_1.refreshAccessToken.refresh).handle());
