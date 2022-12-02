"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitucionController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const auth_midd_1 = require("../middlewares/auth.midd");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const roles_util_1 = tslib_1.__importDefault(require("../utils/roles.util"));
let InstitucionController = class InstitucionController {
    constructor(institucionRepository) {
        this.institucionRepository = institucionRepository;
    }
    async create(institucion) {
        return this.institucionRepository.create(institucion);
    }
    async count(where) {
        return this.institucionRepository.count(where);
    }
    async find(filter) {
        return this.institucionRepository.find(filter);
    }
    async updateAll(institucion, where) {
        return this.institucionRepository.updateAll(institucion, where);
    }
    async findById(id, filter) {
        return this.institucionRepository.findById(id, filter);
    }
    async updateById(id, institucion) {
        await this.institucionRepository.updateById(id, institucion);
    }
    async replaceById(id, institucion) {
        await this.institucionRepository.replaceById(id, institucion);
    }
    async deleteById(id) {
        await this.institucionRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/institucions'),
    (0, rest_1.response)(200, {
        description: 'Institucion model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Institucion) } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Institucion, {
                    title: 'NewInstitucion',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InstitucionController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/institucions/count'),
    (0, rest_1.response)(200, {
        description: 'Institucion model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [roles_util_1.default.admin],
        voters: [auth_midd_1.basicAuthorization],
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Institucion)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InstitucionController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/institucions'),
    (0, rest_1.response)(200, {
        description: 'Array of Institucion model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Institucion, { includeRelations: true }),
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.filter(models_1.Institucion)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InstitucionController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/institucions'),
    (0, rest_1.response)(200, {
        description: 'Institucion PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Institucion, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Institucion)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Institucion, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InstitucionController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/institucions/{id}'),
    (0, rest_1.response)(200, {
        description: 'Institucion model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Institucion, { includeRelations: true }),
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Institucion, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InstitucionController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/institucions/{id}'),
    (0, rest_1.response)(204, {
        description: 'Institucion PATCH success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Institucion, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Institucion]),
    tslib_1.__metadata("design:returntype", Promise)
], InstitucionController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/institucions/{id}'),
    (0, rest_1.response)(204, {
        description: 'Institucion PUT success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Institucion]),
    tslib_1.__metadata("design:returntype", Promise)
], InstitucionController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/institucions/{id}'),
    (0, rest_1.response)(204, {
        description: 'Institucion DELETE success',
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
], InstitucionController.prototype, "deleteById", null);
InstitucionController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.InstitucionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.InstitucionRepository])
], InstitucionController);
exports.InstitucionController = InstitucionController;
//# sourceMappingURL=institucion.controller.js.map