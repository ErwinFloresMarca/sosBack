"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlDbDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
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
let MysqlDbDataSource = class MysqlDbDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
MysqlDbDataSource.dataSourceName = 'mysqlDb';
MysqlDbDataSource.defaultConfig = config;
MysqlDbDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.mysqlDb', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], MysqlDbDataSource);
exports.MysqlDbDataSource = MysqlDbDataSource;
//# sourceMappingURL=mysql-db.datasource.js.map