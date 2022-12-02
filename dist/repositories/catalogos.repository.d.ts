import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDbDataSource } from '../datasources';
import { Catalogos, CatalogosRelations } from '../models';
export declare class CatalogosRepository extends DefaultCrudRepository<Catalogos, typeof Catalogos.prototype.id, CatalogosRelations> {
    constructor(dataSource: MysqlDbDataSource);
}
