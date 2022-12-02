import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDbDataSource } from '../datasources';
import { File, FileRelations } from '../models';
export declare class FileRepository extends DefaultCrudRepository<File, typeof File.prototype.id, FileRelations> {
    constructor(dataSource: MysqlDbDataSource);
}
