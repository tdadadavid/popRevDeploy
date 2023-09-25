"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProjects = exports.createProject = void 0;
const token_1 = require("../../token");
const project_model_1 = require("../model/project.model");
const create_project_service_1 = require("./create_project.service");
const get_projects_service_1 = require("./get_projects.service");
exports.createProject = new create_project_service_1.CreateProject(project_model_1.Projects, token_1.createProjectToken);
exports.findProjects = new get_projects_service_1.GetProjects(project_model_1.Projects);
