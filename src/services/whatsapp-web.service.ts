import axios, { Method } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const WhatsAppWebServiceBindingKey = 'WhatsAppWebServiceKey';

export class WhatsAppWebService {
  async request(req: ReqBody): Promise<IResponse> {
    const { url } = req;
    const baseWSWEBService = 'http://3.19.223.106:3050';
    let response: IResponse = {
      error: true,
      message: 'Error al consumir el servicio de whatsapp',
      response: {},
      status: 500,
    };
    await axios({
      url: `${baseWSWEBService}${url}`,
      method: req.method,
      data: req.data,
    })
      .then((res) => (response = res.data))
      .catch((err) => {
        if (err.response) {
          response = err.response.data;
        }
      });
    return response;
  }

  sendMessage(number:string, msn: string) {
    return this.request({
      url: '/v1/send',
      data: {
        celular: parseInt(number),
        mensaje: msn,
        adjuntos: [],
        guardar: false
      },
      method: 'POST',
    });
  }
}
