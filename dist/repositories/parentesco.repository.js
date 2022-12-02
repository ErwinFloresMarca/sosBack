"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentescoRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ParentescoRepository = class ParentescoRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, usuarioRepositoryGetter) {
        super(models_1.Parentesco, dataSource);
        this.usuarioRepositoryGetter = usuarioRepositoryGetter;
        this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter);
        this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
        this.parent = this.createBelongsToAccessorFor('parent', usuarioRepositoryGetter);
        this.registerInclusionResolver('parent', this.parent.inclusionResolver);
    }
};
ParentescoRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mysqlDb')),
    tslib_1.__param(1, repository_1.repository.getter('UsuarioRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDbDataSource, Function])
], ParentescoRepository);
exports.ParentescoRepository = ParentescoRepository;
//# sourceMappingURL=parentesco.repository.js.map