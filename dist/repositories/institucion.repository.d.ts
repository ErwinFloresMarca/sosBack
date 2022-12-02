import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDbDataSource } from '../datasources';
import { Institucion, InstitucionRelations } from '../models';
export declare class InstitucionRepository extends DefaultCrudRepository<Institucion, typeof Institucion.prototype.id, InstitucionRelations> {
    constructor(dataSource: MysqlDbDataSource);
}
