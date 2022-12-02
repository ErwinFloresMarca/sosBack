"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rastreo = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const index_1 = require("./index");
const position_model_1 = require("./position.model");
const usuario_model_1 = require("./usuario.model");
let Rastreo = class Rastreo extends index_1.TimeStamp {
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
], Rastreo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => position_model_1.Position),
    tslib_1.__metadata("design:type", Array)
], Rastreo.prototype, "positions", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => usuario_model_1.Usuario),
    tslib_1.__metadata("design:type", Number)
], Rastreo.prototype, "usuarioId", void 0);
Rastreo = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Rastreo);
exports.Rastreo = Rastreo;
//# sourceMappingURL=rastreo.model.js.map