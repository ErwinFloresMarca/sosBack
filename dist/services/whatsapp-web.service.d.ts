import { Method } from "axios";
export interface ReqBody {
    url: string;
    data?: any;
    method: Method;
}
export interface IResponse {
    error: boolean;
    message: string;
    response: any;
    status: number;
}
export declare const WhatsAppWebServiceBindingKey = "WhatsAppWebServiceKey";
export declare class WhatsAppWebService {
    request(req: ReqBody): Promise<IResponse>;
    sendMessage(number: string, msn: string): Promise<IResponse>;
}
