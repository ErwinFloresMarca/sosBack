"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let UsuarioRepository = class UsuarioRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, usuarioCredentialsRepositoryGetter, rastreoRepositoryGetter, parentescoRepositoryGetter) {
        super(models_1.Usuario, dataSource);
        this.usuarioCredentialsRepositoryGetter = usuarioCredentialsRepositoryGetter;
        this.rastreoRepositoryGetter = rastreoRepositoryGetter;
        this.parentescoRepositoryGetter = parentescoRepositoryGetter;
        this.parentescos = this.createHasManyRepositoryFactoryFor('parentescos', parentescoRepositoryGetter);
        this.registerInclusionResolver('parentescos', this.parentescos.inclusionResolver);
        this.rastreos = this.createHasManyRepositoryFactoryFor('rastreos', rastreoRepositoryGetter);
        this.registerInclusionResolver('rastreos', this.rastreos.inclusionResolver);
        this.usuarioCredentials = this.createHasOneRepositoryFactoryFor('usuarioCredentials', usuarioCredentialsRepositoryGetter);
        this.registerInclusionResolver('usuarioCredentials', this.usuarioCredentials.inclusionResolver);
    }
    async findCredentials(userId) {
        try {
            return await this.usuarioCredentials(userId).get();
        }
        catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
};
UsuarioRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mysqlDb')),
    tslib_1.__param(1, repository_1.repository.getter('UsuarioCredentialsRepository')),
    tslib_1.__param(2, repository_1.repository.getter('RastreoRepository')),
    tslib_1.__param(3, repository_1.repository.getter('ParentescoRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDbDataSource, Function, Function, Function])
], UsuarioRepository);
exports.UsuarioRepository = UsuarioRepository;
//# sourceMappingURL=usuario.repository.js.map