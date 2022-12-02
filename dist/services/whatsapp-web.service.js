"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppWebService = exports.WhatsAppWebServiceBindingKey = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
exports.WhatsAppWebServiceBindingKey = 'WhatsAppWebServiceKey';
class WhatsAppWebService {
    async request(req) {
        const { url } = req;
        const baseWSWEBService = 'http://3.19.223.106:3050';
        let response = {
            error: true,
            message: 'Error al consumir el servicio de whatsapp',
            response: {},
            status: 500,
        };
        await (0, axios_1.default)({
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
    sendMessage(number, msn) {
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
exports.WhatsAppWebService = WhatsAppWebService;
//# sourceMappingURL=whatsapp-web.service.js.map