import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDbDataSource} from '../datasources';
import {Violencia, ViolenciaRelations} from '../models';

export class ViolenciaRepository extends DefaultCrudRepository<
  Violencia,
  typeof Violencia.prototype.id,
  ViolenciaRelations
> {
  constructor(
    @inject('datasources.mysqlDb') dataSource: MysqlDbDataSource,
  ) {
    super(Violencia, dataSource);
  }
}
