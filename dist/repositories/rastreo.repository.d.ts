import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, BelongsToAccessor } from '@loopback/repository';
import { MysqlDbDataSource } from '../datasources';
import { Rastreo, RastreoRelations, Position, Usuario } from '../models';
import { PositionRepository } from './position.repository';
import { UsuarioRepository } from './usuario.repository';
export declare class RastreoRepository extends DefaultCrudRepository<Rastreo, typeof Rastreo.prototype.id, RastreoRelations> {
    protected positionRepositoryGetter: Getter<PositionRepository>;
    protected usuarioRepositoryGetter: Getter<UsuarioRepository>;
    readonly positions: HasManyRepositoryFactory<Position, typeof Rastreo.prototype.id>;
    readonly usuario: BelongsToAccessor<Usuario, typeof Rastreo.prototype.id>;
    constructor(dataSource: MysqlDbDataSource, positionRepositoryGetter: Getter<PositionRepository>, usuarioRepositoryGetter: Getter<UsuarioRepository>);
}
