"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = require("express");
const proposals_1 = require("../../proposals");
const services_1 = require("../services");
const schema_1 = require("./schema");
const token_1 = require("../../token");
const controlBuilder_1 = require("../../../core/middlewares/controlBuilder");
exports.projectRouter = (0, express_1.Router)();
exports.projectRouter
    .get("/project-proposals", controlBuilder_1.ControlBuilder.builder()
    .setHandler(proposals_1.findProposals.get_all)
    .isPrivate()
    .only("ADMIN")
    .handle())
    .get("/artist-project-proposals", controlBuilder_1.ControlBuilder.builder()
    .setHandler(proposals_1.findProposals.get_by_artists)
    .isPrivate()
    .only("ARTIST")
    .handle())
    .post("/project-proposals", controlBuilder_1.ControlBuilder.builder()
    .setHandler(proposals_1.createProposal.create)
    .setValidator(schema_1.createProposalSchema)
    .isPrivate()
    .only("ARTIST")
    .handle())
    .post("/project-proposal-decision", controlBuilder_1.ControlBuilder.builder()
    .setHandler(proposals_1.decideProposal.decide)
    .setValidator(schema_1.decideProposalSchema)
    .isPrivate()
    .only("ADMIN")
    .handle())
    .post("/", controlBuilder_1.ControlBuilder.builder()
    .setHandler(services_1.createProject.create)
    .setValidator(schema_1.createProjectSchema)
    .isPrivate()
    .only("ADMIN")
    .handle())
    .get("/", controlBuilder_1.ControlBuilder.builder()
    .setHandler(services_1.findProjects.find_active_projects)
    .isPrivate()
    .handle())
    .get("/", controlBuilder_1.ControlBuilder.builder()
    .setHandler(token_1.getTokenTransaction.getTokenTransactions)
    .isPrivate()
    .only("ADMIN")
    .handle());
