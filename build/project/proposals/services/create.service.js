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
exports.CreateProposal = void 0;
const core_1 = require("../../../core");
class CreateProposal {
    constructor(dbProposal) {
        this.dbProposal = dbProposal;
        this.create = ({ input, user, }) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input)
                    throw new core_1.BadRequestError("Invalid Input");
                if (!user)
                    throw new core_1.UnAuthorizedError("Unauthorized");
                const { name, description, estimated_funding_amount, token_value } = input;
                const proposal = yield this.dbProposal.findOne({
                    where: { name },
                });
                if (proposal)
                    throw new core_1.BadRequestError("Proposal Already Exists");
                if (token_value > estimated_funding_amount)
                    throw new core_1.BadRequestError("Token cannot be greater than fund amount");
                const newProposal = yield this.dbProposal.create({
                    artist: user.id,
                    name,
                    description,
                    estimated_funding_amount,
                    token_value,
                });
                return core_1.responseHandler.responseSuccess(200, "Proposal Created Successfully", newProposal);
            }
            catch (error) {
                return core_1.responseHandler.responseSuccess(400, `Error Creating Response ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
    }
}
exports.CreateProposal = CreateProposal;
