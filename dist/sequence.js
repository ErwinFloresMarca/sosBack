"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySequence = void 0;
const tslib_1 = require("tslib");
// autentication
const authentication_1 = require("@loopback/authentication");
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const SequenceActions = rest_1.RestBindings.SequenceActions;
let MySequence = class MySequence {
    constructor(invokeMiddleware, options = rest_1.MiddlewareSequence.defaultOptions, findRoute, parseParams, invoke, send, reject, authenticateRequest) {
        this.invokeMiddleware = invokeMiddleware;
        this.options = options;
        this.findRoute = findRoute;
        this.parseParams = parseParams;
        this.invoke = invoke;
        this.send = send;
        this.reject = reject;
        this.authenticateRequest = authenticateRequest;
    }
    async handle(context) {
        try {
            const { request, response } = context;
            const finished = await this.invokeMiddleware(context);
            if (finished)
                return;
            const route = this.findRoute(request);
            //call authentication action
            await this.authenticateRequest(request);
            const args = await this.parseParams(request, route);
            const result = await this.invoke(route, args);
            this.send(response, result);
        }
        catch (err) {
            if (err.code === authentication_1.AUTHENTICATION_STRATEGY_NOT_FOUND ||
                err.code === authentication_1.USER_PROFILE_NOT_FOUND) {
                Object.assign(err, { statusCode: 401 /* Unauthorized */ });
            }
            this.reject(context, err);
            return;
        }
    }
};
MySequence = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(SequenceActions.INVOKE_MIDDLEWARE)),
    tslib_1.__param(1, (0, context_1.config)()),
    tslib_1.__param(2, (0, context_1.inject)(SequenceActions.FIND_ROUTE)),
    tslib_1.__param(3, (0, context_1.inject)(SequenceActions.PARSE_PARAMS)),
    tslib_1.__param(4, (0, context_1.inject)(SequenceActions.INVOKE_METHOD)),
    tslib_1.__param(5, (0, context_1.inject)(SequenceActions.SEND)),
    tslib_1.__param(6, (0, context_1.inject)(SequenceActions.REJECT)),
    tslib_1.__param(7, (0, context_1.inject)(authentication_1.AuthenticationBindings.AUTH_ACTION)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Function, Function, Function, Function, Function, Function])
], MySequence);
exports.MySequence = MySequence;
//# sourceMappingURL=sequence.js.map