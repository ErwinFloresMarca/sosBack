"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuthorization = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const security_1 = require("@loopback/security");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
// Instance level authorizer
// Can be also registered as an authorizer, depends on users' need.
async function basicAuthorization(authorizationCtx, metadata) {
    // No access if authorization details are missing
    let currentUser;
    if (authorizationCtx.principals.length > 0) {
        const user = lodash_1.default.pick(authorizationCtx.principals[0], [
            'id',
            'usuario',
            'rol',
        ]);
        currentUser = {
            [security_1.securityId]: user.id,
            usuario: user.usuario,
            rol: user.rol,
        };
    }
    else {
        return authorization_1.AuthorizationDecision.DENY;
    }
    if (!currentUser.rol) {
        return authorization_1.AuthorizationDecision.DENY;
    }
    // Authorize everything that does not have a allowedRoles property
    if (!metadata.allowedRoles) {
        return authorization_1.AuthorizationDecision.ALLOW;
    }
    let roleIsAllowed = false;
    if (metadata.allowedRoles.includes(currentUser.rol)) {
        roleIsAllowed = true;
    }
    if (!roleIsAllowed) {
        return authorization_1.AuthorizationDecision.DENY;
    }
    return authorization_1.AuthorizationDecision.ALLOW;
}
exports.basicAuthorization = basicAuthorization;
//# sourceMappingURL=auth.midd.js.map