"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Institucion = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Institucion = class Institucion extends repository_1.Entity {
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
], Institucion.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        mysql: {
            dataType: 'longtext', //tipo de dato de almacenamiento mas amplio de la base de datos
        },
    }),
    tslib_1.__metadata("design:type", String)
], Institucion.prototype, "posicionGegrafica", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Institucion.prototype, "nombre", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: false,
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], Institucion.prototype, "servicio", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Institucion.prototype, "direccion", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], Institucion.prototype, "telefono", void 0);
Institucion = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Institucion);
exports.Institucion = Institucion;
//# sourceMappingURL=institucion.model.js.map