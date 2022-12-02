"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreguntafrecuenteController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const auth_midd_1 = require("../middlewares/auth.midd");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const roles_util_1 = tslib_1.__importDefault(require("../utils/roles.util"));
let PreguntafrecuenteController = class PreguntafrecuenteController {
    constructor(preguntafrecuenteRepository) {
        this.preguntafrecuenteRepository = preguntafrecuenteRepository;
    }
    async create(preguntafrecuente) {
        return this.preguntafrecuenteRepository.create(preguntafrecuente);
    }
    async count(where) {
        return this.preguntafrecuenteRepository.count(where);
    }
    async find(filter) {
        return this.preguntafrecuenteRepository.find(filter);
    }
    async updateAll(preguntafrecuente, where) {
        return this.preguntafrecuenteRepository.updateAll(preguntafrecuente, where);
    }
    async findById(id, filter) {
        return this.preguntafrecuenteRepository.findById(id, filter);
    }
    async updateById(id, preguntafrecuente) {
        await this.preguntafrecuenteRepository.updateById(id, preguntafrecuente);
    }
    async replaceById(id, preguntafrecuente) {
        await this.preguntafrecuenteRepository.replaceById(id, preguntafrecuente);
    }
    async deleteById(id) {
        await this.preguntafrecuenteRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/preguntafrecuentes'),
    (0, rest_1.response)(200, {
        description: 'Preguntafrecuente model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Preguntafrecuente) } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Preguntafrecuente, {
                    title: 'NewPreguntafrecuente',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PreguntafrecuenteController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/preguntafrecuentes/count'),
    (0, rest_1.response)(200, {
        description: 'Preguntafrecuente model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.where(models_1.Preguntafrecuente)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PreguntafrecuenteController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/preguntafrecuentes'),
    (0, rest_1.response)(200, {
        description: 'Array of Preguntafrecuente model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Preguntafrecuente, { includeRelations: true }),
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.filter(models_1.Preguntafrecuente)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PreguntafrecuenteController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/preguntafrecuentes'),
    (0, rest_1.response)(200, {
        description: 'Preguntafrecuente PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Preguntafrecuente, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Preguntafrecuente)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Preguntafrecuente, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PreguntafrecuenteController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/preguntafrecuentes/{id}'),
    (0, rest_1.response)(200, {
        description: 'Preguntafrecuente model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Preguntafrecuente, { includeRelations: true }),
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Preguntafrecuente, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PreguntafrecuenteController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/preguntafrecuentes/{id}'),
    (0, rest_1.response)(204, {
        description: 'Preguntafrecuente PATCH success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Preguntafrecuente, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Preguntafrecuente]),
    tslib_1.__metadata("design:returntype", Promise)
], PreguntafrecuenteController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/preguntafrecuentes/{id}'),
    (0, rest_1.response)(204, {
        description: 'Preguntafrecuente PUT success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Preguntafrecuente]),
    tslib_1.__metadata("design:returntype", Promise)
], PreguntafrecuenteController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/preguntafrecuentes/{id}'),
    (0, rest_1.response)(204, {
        description: 'Preguntafrecuente DELETE success',
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
], PreguntafrecuenteController.prototype, "deleteById", null);
PreguntafrecuenteController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.PreguntafrecuenteRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PreguntafrecuenteRepository])
], PreguntafrecuenteController);
exports.PreguntafrecuenteController = PreguntafrecuenteController;
//# sourceMappingURL=preguntafrecuente.controller.js.map