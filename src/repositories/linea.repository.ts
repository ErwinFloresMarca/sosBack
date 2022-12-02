import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDbDataSource} from '../datasources';
import {Linea, LineaRelations} from '../models';

export class LineaRepository extends DefaultCrudRepository<
  Linea,
  typeof Linea.prototype.id,
  LineaRelations
> {
  constructor(
    @inject('datasources.mysqlDb') dataSource: MysqlDbDataSource,
  ) {
    super(Linea, dataSource);
  }
}
