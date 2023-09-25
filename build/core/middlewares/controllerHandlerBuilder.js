"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlBuilder = void 0;
const controllerHandler_1 = require("./controllerHandler");
class ControlBuilder {
    constructor() {
        this.availableOptions = {
            isPrivate: true,
            isPublic: false,
            isPublicAndPrivate: false,
        };
        this.options = this.availableOptions;
    }
    static builder() {
        return new ControlBuilder();
    }
    setHandler(func) {
        this.handler = func;
        return this;
    }
    setValidator(schema) {
        this.schema = schema;
        return this;
    }
    isPrivate() {
        this.options = Object.assign(Object.assign({}, this.options), { isPrivate: true });
        return this;
    }
    isPublic() {
        this.options = Object.assign(Object.assign({}, this.options), { isPublic: true });
        return this;
    }
    only(...allowed) {
        this.options = Object.assign(Object.assign({}, this.options), { allowedRoles: allowed });
        return this;
    }
    handle() {
        return new controllerHandler_1.ControllerHandler()
            .handle(this.handler, this.schema, this.options);
    }
}
exports.ControlBuilder = ControlBuilder;
