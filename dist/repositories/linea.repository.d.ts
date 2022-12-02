import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDbDataSource } from '../datasources';
import { Linea, LineaRelations } from '../models';
export declare class LineaRepository extends DefaultCrudRepository<Linea, typeof Linea.prototype.id, LineaRelations> {
    constructor(dataSource: MysqlDbDataSource);
}
