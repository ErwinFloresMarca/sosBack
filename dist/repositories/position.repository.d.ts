import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDbDataSource } from '../datasources';
import { Position, PositionRelations } from '../models';
export declare class PositionRepository extends DefaultCrudRepository<Position, typeof Position.prototype.id, PositionRelations> {
    constructor(dataSource: MysqlDbDataSource);
}
