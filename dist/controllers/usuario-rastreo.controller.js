"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRastreoController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const auth_midd_1 = require("../middlewares/auth.midd");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const roles_util_1 = tslib_1.__importDefault(require("../utils/roles.util"));
let UsuarioRastreoController = class UsuarioRastreoController {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async find(id, filter) {
        return this.usuarioRepository.rastreos(id).find(filter);
    }
    async create(id, rastreo) {
        return this.usuarioRepository.rastreos(id).create(rastreo);
    }
    async patch(id, rastreo, where) {
        return this.usuarioRepository.rastreos(id).patch(rastreo, where);
    }
    async delete(id, where) {
        return this.usuarioRepository.rastreos(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/usuarios/{id}/rastreos', {
        responses: {
            '200': {
                description: 'Array of Usuario has many Rastreo',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Rastreo) },
                    },
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioRastreoController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/usuarios/{id}/rastreos', {
        responses: {
            '200': {
                description: 'Usuario model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Rastreo) } },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Rastreo, {
                    title: 'NewRastreoInUsuario',
                    exclude: ['id'],
                    optional: ['usuarioId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioRastreoController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/usuarios/{id}/rastreos', {
        responses: {
            '200': {
                description: 'Usuario.Rastreo PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Rastreo, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Rastreo))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioRastreoController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/usuarios/{id}/rastreos', {
        responses: {
            '200': {
                description: 'Usuario.Rastreo DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [roles_util_1.default.admin],
        voters: [auth_midd_1.basicAuthorization],
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Rastreo))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioRastreoController.prototype, "delete", null);
UsuarioRastreoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UsuarioRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UsuarioRepository])
], UsuarioRastreoController);
exports.UsuarioRastreoController = UsuarioRastreoController;
//# sourceMappingURL=usuario-rastreo.controller.js.map