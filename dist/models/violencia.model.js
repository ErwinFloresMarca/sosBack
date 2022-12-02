"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Violencia = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Violencia = class Violencia extends repository_1.Entity {
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
], Violencia.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], Violencia.prototype, "img", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Violencia.prototype, "titulo", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Violencia.prototype, "descripcion", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'string',
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Violencia.prototype, "ejemplos", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'object',
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Violencia.prototype, "pasos", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'object',
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Violencia.prototype, "contactos", void 0);
Violencia = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Violencia);
exports.Violencia = Violencia;
//# sourceMappingURL=violencia.model.js.map