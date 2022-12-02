"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECURITY_SCHEME_SPEC = exports.SECURITY_SPEC = void 0;
exports.SECURITY_SPEC = [{ bearerAuth: [] }];
exports.SECURITY_SCHEME_SPEC = {
    bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    },
};
//# sourceMappingURL=security-spec.js.map