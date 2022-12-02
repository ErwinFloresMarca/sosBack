import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDbDataSource} from '../datasources';
import {Rastreo, RastreoRelations, Position, Usuario} from '../models';
import {PositionRepository} from './position.repository';
import {UsuarioRepository} from './usuario.repository';

export class RastreoRepository extends DefaultCrudRepository<
  Rastreo,
  typeof Rastreo.prototype.id,
  RastreoRelations
> {

  public readonly positions: HasManyRepositoryFactory<Position, typeof Rastreo.prototype.id>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Rastreo.prototype.id>;

  constructor(@inject('datasources.mysqlDb') dataSource: MysqlDbDataSource, @repository.getter('PositionRepository') protected positionRepositoryGetter: Getter<PositionRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,) {
    super(Rastreo, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.positions = this.createHasManyRepositoryFactoryFor('positions', positionRepositoryGetter,);
    this.registerInclusionResolver('positions', this.positions.inclusionResolver);
  }
}
