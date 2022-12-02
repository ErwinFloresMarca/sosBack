import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDbDataSource} from '../datasources';
import {Institucion, InstitucionRelations} from '../models';

export class InstitucionRepository extends DefaultCrudRepository<
  Institucion,
  typeof Institucion.prototype.id,
  InstitucionRelations
> {
  constructor(
    @inject('datasources.mysqlDb') dataSource: MysqlDbDataSource,
  ) {
    super(Institucion, dataSource);
  }
}
