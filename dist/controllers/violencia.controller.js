"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViolenciaController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const auth_midd_1 = require("../middlewares/auth.midd");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const roles_util_1 = tslib_1.__importDefault(require("../utils/roles.util"));
let ViolenciaController = class ViolenciaController {
    constructor(violenciaRepository) {
        this.violenciaRepository = violenciaRepository;
    }
    async create(violencia) {
        return this.violenciaRepository.create(violencia);
    }
    async count(where) {
        return this.violenciaRepository.count(where);
    }
    async find(filter) {
        return this.violenciaRepository.find(filter);
    }
    async updateAll(violencia, where) {
        return this.violenciaRepository.updateAll(violencia, where);
    }
    async findById(id, filter) {
        return this.violenciaRepository.findById(id, filter);
    }
    async updateById(id, violencia) {
        await this.violenciaRepository.updateById(id, violencia);
    }
    async replaceById(id, violencia) {
        await this.violenciaRepository.replaceById(id, violencia);
    }
    async deleteById(id) {
        await this.violenciaRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/violencias'),
    (0, rest_1.response)(200, {
        description: 'Violencia model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Violencia) } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Violencia, {
                    title: 'NewViolencia',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ViolenciaController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/violencias/count'),
    (0, rest_1.response)(200, {
        description: 'Violencia model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Violencia)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ViolenciaController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/violencias'),
    (0, rest_1.response)(200, {
        description: 'Array of Violencia model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Violencia, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Violencia)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ViolenciaController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/violencias'),
    (0, rest_1.response)(200, {
        description: 'Violencia PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Violencia, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Violencia)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Violencia, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ViolenciaController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/violencias/{id}'),
    (0, rest_1.response)(200, {
        description: 'Violencia model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Violencia, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Violencia, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ViolenciaController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/violencias/{id}'),
    (0, rest_1.response)(204, {
        description: 'Violencia PATCH success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Violencia, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Violencia]),
    tslib_1.__metadata("design:returntype", Promise)
], ViolenciaController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/violencias/{id}'),
    (0, rest_1.response)(204, {
        description: 'Violencia PUT success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Violencia]),
    tslib_1.__metadata("design:returntype", Promise)
], ViolenciaController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/violencias/{id}'),
    (0, rest_1.response)(204, {
        description: 'Violencia DELETE success',
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
], ViolenciaController.prototype, "deleteById", null);
ViolenciaController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ViolenciaRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ViolenciaRepository])
], ViolenciaController);
exports.ViolenciaController = ViolenciaController;
//# sourceMappingURL=violencia.controller.js.map