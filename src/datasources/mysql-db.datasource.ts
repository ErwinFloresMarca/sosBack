import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const dotenv = require('dotenv').config();

const config = {
  name: 'mysqlDb',
  connector: 'mysql',
  // url: 'mysql://user_sos:password_sos@db4free.net:3306/dbsosapp',
  // url: 'mysql://user_sos:password_sos@127.0.0.1:3306/sos_db',
  url: 'mysql://root:12345678@127.0.0.1:3306/sos_db',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqlDbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'mysqlDb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mysqlDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
