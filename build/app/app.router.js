"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const core_1 = require("../core");
const auth_router_1 = require("../auth/router/auth.router");
const user_router_1 = require("../user/router/user.router");
const project_router_1 = require("../project/project/router/project.router");
exports.appRouter = (0, express_1.Router)();
exports.appRouter.use("/auth", auth_router_1.authRouter);
exports.appRouter.use("/user", user_router_1.userRouter);
exports.appRouter.use("/project", project_router_1.projectRouter);
exports.appRouter.get("/health", (_, res) => {
    res.status(core_1.HttpStatus.OK).json({
        message: "App up",
        version: "1.0",
    });
});
