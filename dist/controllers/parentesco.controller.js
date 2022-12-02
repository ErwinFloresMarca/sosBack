"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentescoController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const auth_midd_1 = require("../middlewares/auth.midd");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const roles_util_1 = tslib_1.__importDefault(require("../utils/roles.util"));
let ParentescoController = class ParentescoController {
    constructor(parentescoRepository) {
        this.parentescoRepository = parentescoRepository;
    }
    async create(parentesco) {
        return this.parentescoRepository.create(parentesco);
    }
    async count(where) {
        return this.parentescoRepository.count(where);
    }
    async find(filter) {
        return this.parentescoRepository.find(filter);
    }
    async updateAll(parentesco, where) {
        return this.parentescoRepository.updateAll(parentesco, where);
    }
    async findById(id, filter) {
        return this.parentescoRepository.findById(id, filter);
    }
    async updateById(id, parentesco) {
        await this.parentescoRepository.updateById(id, parentesco);
    }
    async replaceById(id, parentesco) {
        await this.parentescoRepository.replaceById(id, parentesco);
    }
    async deleteById(id) {
        await this.parentescoRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/parentescos'),
    (0, rest_1.response)(200, {
        description: 'Parentesco model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Parentesco) } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Parentesco, {
                    title: 'NewParentesco',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ParentescoController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/parentescos/count'),
    (0, rest_1.response)(200, {
        description: 'Parentesco model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.where(models_1.Parentesco)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ParentescoController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/parentescos'),
    (0, rest_1.response)(200, {
        description: 'Array of Parentesco model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Parentesco, { includeRelations: true }),
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.filter(models_1.Parentesco)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ParentescoController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/parentescos'),
    (0, rest_1.response)(200, {
        description: 'Parentesco PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Parentesco, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Parentesco)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Parentesco, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ParentescoController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/parentescos/{id}'),
    (0, rest_1.response)(200, {
        description: 'Parentesco model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Parentesco, { includeRelations: true }),
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Parentesco, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ParentescoController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/parentescos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Parentesco PATCH success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Parentesco, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Parentesco]),
    tslib_1.__metadata("design:returntype", Promise)
], ParentescoController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/parentescos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Parentesco PUT success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Parentesco]),
    tslib_1.__metadata("design:returntype", Promise)
], ParentescoController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/parentescos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Parentesco DELETE success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)({
        allowedRoles: [roles_util_1.default.admin, roles_util_1.default.user],
        voters: [auth_midd_1.basicAuthorization],
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ParentescoController.prototype, "deleteById", null);
ParentescoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ParentescoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ParentescoRepository])
], ParentescoController);
exports.ParentescoController = ParentescoController;
//# sourceMappingURL=parentesco.controller.js.map