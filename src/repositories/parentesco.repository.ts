import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDbDataSource} from '../datasources';
import {Parentesco, ParentescoRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class ParentescoRepository extends DefaultCrudRepository<
  Parentesco,
  typeof Parentesco.prototype.id,
  ParentescoRelations
> {

  public readonly parent: BelongsToAccessor<Usuario, typeof Parentesco.prototype.id>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Parentesco.prototype.id>;

  constructor(
    @inject('datasources.mysqlDb') dataSource: MysqlDbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Parentesco, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.parent = this.createBelongsToAccessorFor('parent', usuarioRepositoryGetter,);
    this.registerInclusionResolver('parent', this.parent.inclusionResolver);
  }
}
