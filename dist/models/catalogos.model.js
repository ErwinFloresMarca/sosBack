"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Catalogos = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Catalogos = class Catalogos extends repository_1.Entity {
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
], Catalogos.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Catalogos.prototype, "tipo", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Catalogos.prototype, "nombre", void 0);
Catalogos = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Catalogos);
exports.Catalogos = Catalogos;
//# sourceMappingURL=catalogos.model.js.map