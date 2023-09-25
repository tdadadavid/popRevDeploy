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
exports.FindProposals = void 0;
const core_1 = require("../../../core");
class FindProposals {
    constructor(dbProposals) {
        this.dbProposals = dbProposals;
        this.get_all = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const allProposals = yield this.dbProposals.findAll();
                return core_1.responseHandler.responseSuccess(200, "Proposals Fetched Successfully", allProposals);
            }
            catch (error) {
                return core_1.responseHandler.responseError(400, `Error Fetching Proposals ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
        this.get_by_artists = ({ user }) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!user)
                    throw new core_1.UnAuthorizedError("Unauthorized");
                const allProposals = yield this.dbProposals.findAll({
                    where: { artist: user.id },
                });
                if (!allProposals)
                    throw new core_1.BadRequestError("Artist does not have any Proposals");
                return core_1.responseHandler.responseSuccess(200, "Proposals Fetched Successfully", allProposals);
            }
            catch (error) {
                return core_1.responseHandler.responseError(400, `Error Fetching Proposals ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
    }
}
exports.FindProposals = FindProposals;
