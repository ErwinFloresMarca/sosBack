"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentials = void 0;
const rest_1 = require("@loopback/rest");
function validateCredentials(credentials) {
    // Validate Email
    // validate credentials
    if (!credentials.usuario) {
        throw new rest_1.HttpErrors.UnprocessableEntity('invalid user');
    }
    // Validate Password Length
    if (!credentials.password || credentials.password.length < 8) {
        throw new rest_1.HttpErrors.UnprocessableEntity('password must be minimum 8 characters');
    }
}
exports.validateCredentials = validateCredentials;
//# sourceMappingURL=validator.service.js.map