import { AuthenticateFn } from '@loopback/authentication';
import { InvokeMiddleware, InvokeMiddlewareOptions } from '@loopback/express';
import { FindRoute, InvokeMethod, ParseParams, Reject, RequestContext, Send, SequenceHandler } from '@loopback/rest';
export declare class MySequence implements SequenceHandler {
    readonly invokeMiddleware: InvokeMiddleware;
    readonly options: InvokeMiddlewareOptions;
    protected findRoute: FindRoute;
    protected parseParams: ParseParams;
    protected invoke: InvokeMethod;
    send: Send;
    reject: Reject;
    protected authenticateRequest: AuthenticateFn;
    constructor(invokeMiddleware: InvokeMiddleware, options: InvokeMiddlewareOptions, findRoute: FindRoute, parseParams: ParseParams, invoke: InvokeMethod, send: Send, reject: Reject, authenticateRequest: AuthenticateFn);
    handle(context: RequestContext): Promise<void>;
}
