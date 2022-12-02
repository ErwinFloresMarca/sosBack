"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Position = class Position extends repository_1.Entity {
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
], Position.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Position.prototype, "rastreoId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Position.prototype, "position", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        mysql: {
            dataType: 'timestamp',
            default: 'CURRENT_TIMESTAMP', //rellena por defecto con la fecha actual de creacion en la basse de datos
        },
        defaultFn: 'now',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], Position.prototype, "createdAt", void 0);
Position = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Position);
exports.Position = Position;
//# sourceMappingURL=position.model.js.map