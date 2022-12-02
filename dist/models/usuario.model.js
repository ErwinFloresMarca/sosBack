"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const time_stamp_model_1 = require("./time-stamp.model");
const usuario_credentials_model_1 = require("./usuario-credentials.model");
const rastreo_model_1 = require("./rastreo.model");
const parentesco_model_1 = require("./parentesco.model");
let Usuario = class Usuario extends time_stamp_model_1.TimeStamp {
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
], Usuario.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "nombres", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "paterno", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "materno", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: false,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "ci", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "celular", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        index: { unique: true },
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "usuario", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "avatar", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "rol", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: Boolean,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Usuario.prototype, "rastreoEnLinea", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: Date,
    }),
    tslib_1.__metadata("design:type", Date)
], Usuario.prototype, "fechaNacimiento", void 0);
tslib_1.__decorate([
    (0, repository_1.hasOne)(() => usuario_credentials_model_1.UsuarioCredentials),
    tslib_1.__metadata("design:type", usuario_credentials_model_1.UsuarioCredentials)
], Usuario.prototype, "usuarioCredentials", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => rastreo_model_1.Rastreo),
    tslib_1.__metadata("design:type", Array)
], Usuario.prototype, "rastreos", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => parentesco_model_1.Parentesco),
    tslib_1.__metadata("design:type", Array)
], Usuario.prototype, "parentescos", void 0);
Usuario = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Usuario);
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.model.js.map