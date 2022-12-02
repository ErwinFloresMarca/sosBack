"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RastreoRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let RastreoRepository = class RastreoRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, positionRepositoryGetter, usuarioRepositoryGetter) {
        super(models_1.Rastreo, dataSource);
        this.positionRepositoryGetter = positionRepositoryGetter;
        this.usuarioRepositoryGetter = usuarioRepositoryGetter;
        this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter);
        this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
        this.positions = this.createHasManyRepositoryFactoryFor('positions', positionRepositoryGetter);
        this.registerInclusionResolver('positions', this.positions.inclusionResolver);
    }
};
RastreoRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mysqlDb')),
    tslib_1.__param(1, repository_1.repository.getter('PositionRepository')),
    tslib_1.__param(2, repository_1.repository.getter('UsuarioRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDbDataSource, Function, Function])
], RastreoRepository);
exports.RastreoRepository = RastreoRepository;
//# sourceMappingURL=rastreo.repository.js.map