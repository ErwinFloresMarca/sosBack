import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDbDataSource} from '../datasources';
import {Preguntafrecuente, PreguntafrecuenteRelations} from '../models';

export class PreguntafrecuenteRepository extends DefaultCrudRepository<
  Preguntafrecuente,
  typeof Preguntafrecuente.prototype.id,
  PreguntafrecuenteRelations
> {
  constructor(
    @inject('datasources.mysqlDb') dataSource: MysqlDbDataSource,
  ) {
    super(Preguntafrecuente, dataSource);
  }
}
