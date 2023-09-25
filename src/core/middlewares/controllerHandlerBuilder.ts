import { AnyFunction, ControllerHandlerOptions, Roles, ValidationSchema } from "../types";
import { ControllerHandler } from "./controllerHandler";


export class ControlBuilder {
    private handler!: AnyFunction;
    private schema: ValidationSchema | undefined;
    private availableOptions = {
        isPrivate: true,
        isPublic: false,
        isPublicAndPrivate: false,
    };
    private options: ControllerHandlerOptions  = this.availableOptions;

    static builder(){
        return new ControlBuilder();
    }


    setHandler(func: AnyFunction) {
        this.handler = func;
        return this;
    }

    setValidator(schema: ValidationSchema){
        this.schema = schema;
        return this;
    }

    isPrivate(){
        this.options = { ...this.options, isPrivate: true };
        return this;
    }

    isPublic(){
        this.options = { ...this.options, isPublic: true };
        return this;
    }

    only(...allowed: Roles[]){
        this.options = { ...this.options, allowedRoles: allowed }
        return this;
    }

    handle() {
        return new ControllerHandler()
            .handle(this.handler, this.schema, this.options)
    }
}