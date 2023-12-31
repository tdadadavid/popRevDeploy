"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProposals = exports.decideProposal = exports.createProposal = void 0;
const project_1 = require("../../project");
const models_1 = require("../models");
const create_service_1 = require("./create.service");
const decide_service_1 = require("./decide.service");
const find_service_1 = require("./find.service");
exports.createProposal = new create_service_1.CreateProposal(models_1.Proposal);
exports.decideProposal = new decide_service_1.DecideProposal(models_1.Proposal, project_1.createProject);
exports.findProposals = new find_service_1.FindProposals(models_1.Proposal);
