import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDbDataSource } from '../datasources';
import { Preguntafrecuente, PreguntafrecuenteRelations } from '../models';
export declare class PreguntafrecuenteRepository extends DefaultCrudRepository<Preguntafrecuente, typeof Preguntafrecuente.prototype.id, PreguntafrecuenteRelations> {
    constructor(dataSource: MysqlDbDataSource);
}
