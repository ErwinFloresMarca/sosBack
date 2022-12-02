"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RastreoPositionController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const auth_midd_1 = require("../middlewares/auth.midd");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const roles_util_1 = tslib_1.__importDefault(require("../utils/roles.util"));
let RastreoPositionController = class RastreoPositionController {
    constructor(rastreoRepository) {
        this.rastreoRepository = rastreoRepository;
    }
    async find(id, filter) {
        return this.rastreoRepository.positions(id).find(filter);
    }
    async create(id, position) {
        return this.rastreoRepository.positions(id).create(position);
    }
    async patch(id, position, where) {
        return this.rastreoRepository.positions(id).patch(position, where);
    }
    async delete(id, where) {
        return this.rastreoRepository.positions(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/rastreos/{id}/positions', {
        responses: {
            '200': {
                description: 'Array of Rastreo has many Position',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Position) },
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
], RastreoPositionController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/rastreos/{id}/positions', {
        responses: {
            '200': {
                description: 'Rastreo model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Position) } },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Position, {
                    title: 'NewPositionInRastreo',
                    exclude: ['id'],
                    optional: ['rastreoId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RastreoPositionController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/rastreos/{id}/positions', {
        responses: {
            '200': {
                description: 'Rastreo.Position PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Position, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Position))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RastreoPositionController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/rastreos/{id}/positions', {
        responses: {
            '200': {
                description: 'Rastreo.Position DELETE success count',
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
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Position))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RastreoPositionController.prototype, "delete", null);
RastreoPositionController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.RastreoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.RastreoRepository])
], RastreoPositionController);
exports.RastreoPositionController = RastreoPositionController;
//# sourceMappingURL=rastreo-position.controller.js.map