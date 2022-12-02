"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RastreoController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const auth_midd_1 = require("../middlewares/auth.midd");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const roles_util_1 = tslib_1.__importDefault(require("../utils/roles.util"));
let RastreoController = class RastreoController {
    constructor(rastreoRepository) {
        this.rastreoRepository = rastreoRepository;
    }
    async create(rastreo) {
        return this.rastreoRepository.create({
            ...rastreo,
            createdAt: (new Date()).toISOString(),
        });
    }
    async count(where) {
        return this.rastreoRepository.count(where);
    }
    async find(filter) {
        return this.rastreoRepository.find(filter);
    }
    async findById(id, filter) {
        return this.rastreoRepository.findById(id, filter);
    }
    async updateById(id, rastreo) {
        await this.rastreoRepository.updateById(id, {
            ...rastreo,
            updatedAt: (new Date()).toISOString(),
        });
    }
    async deleteById(id) {
        await this.rastreoRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/rastreos'),
    (0, rest_1.response)(200, {
        description: 'Rastreo model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Rastreo) } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Rastreo, {
                    title: 'NewRastreo',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RastreoController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/rastreos/count'),
    (0, rest_1.response)(200, {
        description: 'Rastreo model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.where(models_1.Rastreo)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RastreoController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/rastreos'),
    (0, rest_1.response)(200, {
        description: 'Array of Rastreo model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Rastreo, { includeRelations: true }),
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.filter(models_1.Rastreo)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RastreoController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.get)('/rastreos/{id}'),
    (0, rest_1.response)(200, {
        description: 'Rastreo model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Rastreo, { includeRelations: true }),
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Rastreo, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RastreoController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/rastreos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Rastreo PATCH success',
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Rastreo]),
    tslib_1.__metadata("design:returntype", Promise)
], RastreoController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/rastreos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Rastreo DELETE success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [roles_util_1.default.admin],
        voters: [auth_midd_1.basicAuthorization],
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], RastreoController.prototype, "deleteById", null);
RastreoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.RastreoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.RastreoRepository])
], RastreoController);
exports.RastreoController = RastreoController;
//# sourceMappingURL=rastreo.controller.js.map