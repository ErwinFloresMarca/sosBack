"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViolenciaRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ViolenciaRepository = class ViolenciaRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Violencia, dataSource);
    }
};
ViolenciaRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mysqlDb')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDbDataSource])
], ViolenciaRepository);
exports.ViolenciaRepository = ViolenciaRepository;
//# sourceMappingURL=violencia.repository.js.map