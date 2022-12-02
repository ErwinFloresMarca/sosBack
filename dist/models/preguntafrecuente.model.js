"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preguntafrecuente = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Preguntafrecuente = class Preguntafrecuente extends repository_1.Entity {
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
], Preguntafrecuente.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        default: 1,
    }),
    tslib_1.__metadata("design:type", Number)
], Preguntafrecuente.prototype, "mencion", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Preguntafrecuente.prototype, "pregunta", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Preguntafrecuente.prototype, "respuesta", void 0);
Preguntafrecuente = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Preguntafrecuente);
exports.Preguntafrecuente = Preguntafrecuente;
//# sourceMappingURL=preguntafrecuente.model.js.map