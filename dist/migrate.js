"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = void 0;
const application_1 = require("./application");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dotenv = require('dotenv').config();
async function migrate(args) {
    const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
    console.log('Migrating schemas (%s existing schema)', existingSchema);
    const app = new application_1.DocumentosAplication();
    await app.boot();
    await app.migrateSchema({ existingSchema });
    // Connectors usually keep a pool of opened connections,
    // this keeps the process running even after all work is done.
    // We need to exit explicitly.
    process.exit(0);
}
exports.migrate = migrate;
migrate(process.argv).catch(err => {
    console.error('Cannot migrate database schema', err);
    process.exit(1);
});
//# sourceMappingURL=migrate.js.map