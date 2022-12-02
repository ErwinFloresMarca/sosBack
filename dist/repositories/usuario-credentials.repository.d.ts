import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDbDataSource } from '../datasources';
import { UsuarioCredentials, UsuarioCredentialsRelations } from '../models';
export declare class UsuarioCredentialsRepository extends DefaultCrudRepository<UsuarioCredentials, typeof UsuarioCredentials.prototype.id, UsuarioCredentialsRelations> {
    constructor(dataSource: MysqlDbDataSource);
}
