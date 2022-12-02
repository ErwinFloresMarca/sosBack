import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDbDataSource } from '../datasources';
import { Violencia, ViolenciaRelations } from '../models';
export declare class ViolenciaRepository extends DefaultCrudRepository<Violencia, typeof Violencia.prototype.id, ViolenciaRelations> {
    constructor(dataSource: MysqlDbDataSource);
}
