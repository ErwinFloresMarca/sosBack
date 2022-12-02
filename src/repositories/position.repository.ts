import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDbDataSource} from '../datasources';
import {Position, PositionRelations} from '../models';

export class PositionRepository extends DefaultCrudRepository<
  Position,
  typeof Position.prototype.id,
  PositionRelations
> {
  constructor(
    @inject('datasources.mysqlDb') dataSource: MysqlDbDataSource,
  ) {
    super(Position, dataSource);
  }
}
