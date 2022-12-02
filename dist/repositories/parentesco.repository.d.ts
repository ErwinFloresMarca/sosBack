import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { MysqlDbDataSource } from '../datasources';
import { Parentesco, ParentescoRelations, Usuario } from '../models';
import { UsuarioRepository } from './usuario.repository';
export declare class ParentescoRepository extends DefaultCrudRepository<Parentesco, typeof Parentesco.prototype.id, ParentescoRelations> {
    protected usuarioRepositoryGetter: Getter<UsuarioRepository>;
    readonly parent: BelongsToAccessor<Usuario, typeof Parentesco.prototype.id>;
    readonly usuario: BelongsToAccessor<Usuario, typeof Parentesco.prototype.id>;
    constructor(dataSource: MysqlDbDataSource, usuarioRepositoryGetter: Getter<UsuarioRepository>);
}
