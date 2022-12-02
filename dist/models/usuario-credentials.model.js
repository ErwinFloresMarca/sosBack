"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioCredentials = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const time_stamp_model_1 = require("./time-stamp.model");
let UsuarioCredentials = class UsuarioCredentials extends time_stamp_model_1.TimeStamp {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], UsuarioCredentials.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], UsuarioCredentials.prototype, "password", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], UsuarioCredentials.prototype, "usuarioId", void 0);
UsuarioCredentials = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], UsuarioCredentials);
exports.UsuarioCredentials = UsuarioCredentials;
//# sourceMappingURL=usuario-credentials.model.js.map