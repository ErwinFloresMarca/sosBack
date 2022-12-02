import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDbDataSource } from '../datasources';
import { Usuario, UsuarioCredentials, UsuarioRelations, Rastreo, Parentesco } from '../models';
import { UsuarioCredentialsRepository } from './usuario-credentials.repository';
import { RastreoRepository } from './rastreo.repository';
import { ParentescoRepository } from './parentesco.repository';
export declare type Credentials = {
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
export declare type LoginCredentials = {
    usuario: string;
    password: string;
};
export declare class UsuarioRepository extends DefaultCrudRepository<Usuario, typeof Usuario.prototype.id, UsuarioRelations> {
    protected usuarioCredentialsRepositoryGetter: Getter<UsuarioCredentialsRepository>;
    protected rastreoRepositoryGetter: Getter<RastreoRepository>;
    protected parentescoRepositoryGetter: Getter<ParentescoRepository>;
    readonly usuarioCredentials: HasOneRepositoryFactory<UsuarioCredentials, typeof Usuario.prototype.id>;
    readonly rastreos: HasManyRepositoryFactory<Rastreo, typeof Usuario.prototype.id>;
    readonly parentescos: HasManyRepositoryFactory<Parentesco, typeof Usuario.prototype.id>;
    constructor(dataSource: MysqlDbDataSource, usuarioCredentialsRepositoryGetter: Getter<UsuarioCredentialsRepository>, rastreoRepositoryGetter: Getter<RastreoRepository>, parentescoRepositoryGetter: Getter<ParentescoRepository>);
    findCredentials(userId: typeof Usuario.prototype.id): Promise<UsuarioCredentials | undefined>;
}
