import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDbDataSource} from '../datasources';
import {Usuario, UsuarioCredentials, UsuarioRelations, Rastreo, Parentesco} from '../models';
import {UsuarioCredentialsRepository} from './usuario-credentials.repository';
import {RastreoRepository} from './rastreo.repository';
import {ParentescoRepository} from './parentesco.repository';

export type Credentials = {
  nombres?: string;
  paterno?: string;
  materno?: string;
  usuario: string;
  celular?: string;
  ci?: string;
  password: string;
  email?: string;
  rol?: string;
};

export type LoginCredentials = {
  usuario: string;
  password: string;
};

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {
  public readonly usuarioCredentials: HasOneRepositoryFactory<
    UsuarioCredentials,
    typeof Usuario.prototype.id
  >;

  public readonly rastreos: HasManyRepositoryFactory<Rastreo, typeof Usuario.prototype.id>;

  public readonly parentescos: HasManyRepositoryFactory<Parentesco, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mysqlDb') dataSource: MysqlDbDataSource,
    @repository.getter('UsuarioCredentialsRepository')
    protected usuarioCredentialsRepositoryGetter: Getter<UsuarioCredentialsRepository>, @repository.getter('RastreoRepository') protected rastreoRepositoryGetter: Getter<RastreoRepository>, @repository.getter('ParentescoRepository') protected parentescoRepositoryGetter: Getter<ParentescoRepository>,
  ) {
    super(Usuario, dataSource);
    this.parentescos = this.createHasManyRepositoryFactoryFor('parentescos', parentescoRepositoryGetter,);
    this.registerInclusionResolver('parentescos', this.parentescos.inclusionResolver);
    this.rastreos = this.createHasManyRepositoryFactoryFor('rastreos', rastreoRepositoryGetter,);
    this.registerInclusionResolver('rastreos', this.rastreos.inclusionResolver);
    this.usuarioCredentials = this.createHasOneRepositoryFactoryFor(
      'usuarioCredentials',
      usuarioCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'usuarioCredentials',
      this.usuarioCredentials.inclusionResolver,
    );
  }
  async findCredentials(
    userId: typeof Usuario.prototype.id,
  ): Promise<UsuarioCredentials | undefined> {
    try {
      return await this.usuarioCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
