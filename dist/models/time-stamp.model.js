"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeStamp = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let TimeStamp = class TimeStamp extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: true,
        required: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], TimeStamp.prototype, "estado", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        defaultFn: 'now',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TimeStamp.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        defaultFn: 'now',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TimeStamp.prototype, "updatedAt", void 0);
TimeStamp = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], TimeStamp);
exports.TimeStamp = TimeStamp;
//# sourceMappingURL=time-stamp.model.js.map