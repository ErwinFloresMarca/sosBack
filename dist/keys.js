"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORAGE_DIRECTORY = exports.FILE_UPLOAD_SERVICE = exports.UserServiceBindings = exports.PasswordHasherBindings = exports.TokenServiceBindings = exports.TokenServiceConstants = void 0;
const context_1 = require("@loopback/context");
var TokenServiceConstants;
(function (TokenServiceConstants) {
    TokenServiceConstants.TOKEN_SECRET_VALUE = process.env.JWT_SECRET
        ? process.env.JWT_SECRET
        : 'myjwts3cr3t';
    TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE = process.env.JWT_EXPIRES_IN
        ? process.env.JWT_EXPIRES_IN
        : '36000';
})(TokenServiceConstants = exports.TokenServiceConstants || (exports.TokenServiceConstants = {}));
var TokenServiceBindings;
(function (TokenServiceBindings) {
    TokenServiceBindings.TOKEN_SECRET = context_1.BindingKey.create('authentication.jwt.secret');
    TokenServiceBindings.TOKEN_EXPIRES_IN = context_1.BindingKey.create('authentication.jwt.expires.in.seconds');
    TokenServiceBindings.TOKEN_SERVICE = context_1.BindingKey.create('services.authentication.jwt.tokenservice');
})(TokenServiceBindings = exports.TokenServiceBindings || (exports.TokenServiceBindings = {}));
var PasswordHasherBindings;
(function (PasswordHasherBindings) {
    PasswordHasherBindings.PASSWORD_HASHER = context_1.BindingKey.create('services.hasher');
    PasswordHasherBindings.ROUNDS = context_1.BindingKey.create('services.hasher.round');
})(PasswordHasherBindings = exports.PasswordHasherBindings || (exports.PasswordHasherBindings = {}));
var UserServiceBindings;
(function (UserServiceBindings) {
    UserServiceBindings.USER_SERVICE = context_1.BindingKey.create('services.user.service');
})(UserServiceBindings = exports.UserServiceBindings || (exports.UserServiceBindings = {}));
exports.FILE_UPLOAD_SERVICE = context_1.BindingKey.create('services.FileUpload'); // Binding key for the storage directory
exports.STORAGE_DIRECTORY = context_1.BindingKey.create('storage.directory');
//# sourceMappingURL=keys.js.map