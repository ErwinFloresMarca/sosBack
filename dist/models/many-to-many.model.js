"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManyToMany = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let ManyToMany = class ManyToMany extends repository_1.Model {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        min: 1,
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ManyToMany.prototype, "relationId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], ManyToMany.prototype, "link", void 0);
ManyToMany = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ManyToMany);
exports.ManyToMany = ManyToMany;
//# sourceMappingURL=many-to-many.model.js.map