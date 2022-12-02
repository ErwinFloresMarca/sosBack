"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const tslib_1 = require("tslib");
const application_1 = require("./application");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dotenv = require('dotenv').config();
tslib_1.__exportStar(require("./application"), exports);
tslib_1.__exportStar(require("./websocket.server"), exports);
tslib_1.__exportStar(require("./decorators/websocket.decorator"), exports);
tslib_1.__exportStar(require("./websocket-controller-factory"), exports);
async function main(options = {}) {
    const app = new application_1.DocumentosAplication(options);
    await app.boot();
    await app.start();
    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    console.log(`Try ${url}/ping`);
    return app;
}
exports.main = main;
if (require.main === module) {
    // Run the application
    const config = {
        rest: {
            port: +((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000),
            host: process.env.HOST,
            // The `gracePeriodForClose` provides a graceful close for http/https
            // servers with keep-alive clients. The default value is `Infinity`
            // (don't force-close). If you want to immediately destroy all sockets
            // upon stop, set its value to `0`.
            // See https://www.npmjs.com/package/stoppable
            gracePeriodForClose: 5000,
            openApiSpec: {
                // useful when used with OpenAPI-to-GraphQL to locate your application
                setServersFromRequest: true,
            },
        },
        websocket: {
            port: +((_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3000),
        }
    };
    main(config).catch(err => {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map