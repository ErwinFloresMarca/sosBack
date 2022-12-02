"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentosAplication = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const multer_1 = tslib_1.__importDefault(require("multer"));
const path_1 = tslib_1.__importDefault(require("path"));
const jwt_strategy_1 = require("./authentication-strategies/jwt-strategy");
const keys_1 = require("./keys");
const sequence_1 = require("./sequence");
const services_1 = require("./services");
const security_spec_1 = require("./utils/security-spec");
// uuid para nombres de archivos
const uuid_1 = require("uuid");
const whatsapp_web_service_1 = require("./services/whatsapp-web.service");
class DocumentosAplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        //...
        // ------ ADD SNIPPET AT THE BOTTOM ---------
        // Mount authentication system
        this.component(authentication_1.AuthenticationComponent);
        this.component(authorization_1.AuthorizationComponent);
        this.setUpBindings();
        // ------------- END OF SNIPPET -------------
        //...
        //Add Autentication strategies
        this.add((0, core_1.createBindingFromClass)(jwt_strategy_1.JWTAuthenticationStrategy));
        (0, authentication_1.registerAuthenticationStrategy)(this, jwt_strategy_1.JWTAuthenticationStrategy);
        //End add Autentication Strategies
        this.service(services_1.ExcelService);
        this.service(whatsapp_web_service_1.WhatsAppWebService);
        // this.setUpBindings();
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        // Configure file upload with multer options
        this.configureFileUpload(options.fileStorageDirectory);
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
        const spec = {
            openapi: '3.0.0',
            info: { title: 'pkg.name', version: 'pkg.version' },
            paths: {},
            components: { securitySchemes: security_spec_1.SECURITY_SCHEME_SPEC },
            servers: [{ url: '/api' }],
            security: security_spec_1.SECURITY_SPEC,
        };
        this.api(spec);
    }
    setUpBindings() {
        this.bind(keys_1.TokenServiceBindings.TOKEN_SECRET).to(keys_1.TokenServiceConstants.TOKEN_SECRET_VALUE);
        this.bind(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN).to(keys_1.TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
        //bind whatsapp service
        const wss = new whatsapp_web_service_1.WhatsAppWebService();
        this.bind(whatsapp_web_service_1.WhatsAppWebServiceBindingKey).to(wss);
        this.bind(keys_1.TokenServiceBindings.TOKEN_SERVICE).toClass(services_1.JWTService);
        // // Bind bcrypt hash services
        this.bind(keys_1.PasswordHasherBindings.ROUNDS).to(10);
        this.bind(keys_1.PasswordHasherBindings.PASSWORD_HASHER).toClass(services_1.BcryptHasher);
        this.bind(keys_1.UserServiceBindings.USER_SERVICE).toClass(services_1.MyUserService);
    }
    /**
     * Configure `multer` options for file upload
     */
    configureFileUpload(destination) {
        // Upload files to `dist/.sandbox` by default
        destination = destination !== null && destination !== void 0 ? destination : path_1.default.join(__dirname, '../.sandbox');
        this.bind(keys_1.STORAGE_DIRECTORY).to(destination);
        const multerOptions = {
            storage: multer_1.default.diskStorage({
                destination,
                // Use the original file name as is
                filename: (req, file, cb) => {
                    const name = (0, uuid_1.v4)().toString();
                    const extencion = file.originalname.substring(file.originalname.lastIndexOf('.') + 1, file.originalname.length);
                    cb(null, `${name}.${extencion}`);
                },
            }),
        };
        // Configure the file upload service with multer options
        this.configure(keys_1.FILE_UPLOAD_SERVICE).to(multerOptions);
    }
}
exports.DocumentosAplication = DocumentosAplication;
//# sourceMappingURL=application.js.map