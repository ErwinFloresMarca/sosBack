"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineaController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const auth_midd_1 = require("../middlewares/auth.midd");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const roles_util_1 = tslib_1.__importDefault(require("../utils/roles.util"));
let LineaController = class LineaController {
    constructor(lineaRepository) {
        this.lineaRepository = lineaRepository;
    }
    async create(linea) {
        return this.lineaRepository.create(linea);
    }
    async count(where) {
        return this.lineaRepository.count(where);
    }
    async find(filter) {
        return this.lineaRepository.find(filter);
    }
    async updateAll(linea, where) {
        return this.lineaRepository.updateAll(linea, where);
    }
    async findById(id, filter) {
        return this.lineaRepository.findById(id, filter);
    }
    async updateById(id, linea) {
        await this.lineaRepository.updateById(id, linea);
    }
    async replaceById(id, linea) {
        await this.lineaRepository.replaceById(id, linea);
    }
    async deleteById(id) {
        await this.lineaRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/lineas'),
    (0, rest_1.response)(200, {
        description: 'Linea model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Linea) } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Linea, {
                    title: 'NewLinea',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LineaController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/lineas/count'),
    (0, rest_1.response)(200, {
        description: 'Linea model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Linea)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LineaController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/lineas'),
    (0, rest_1.response)(200, {
        description: 'Array of Linea model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Linea, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Linea)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LineaController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/lineas'),
    (0, rest_1.response)(200, {
        description: 'Linea PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Linea, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Linea)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Linea, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LineaController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/lineas/{id}'),
    (0, rest_1.response)(200, {
        description: 'Linea model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Linea, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Linea, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LineaController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/lineas/{id}'),
    (0, rest_1.response)(204, {
        description: 'Linea PATCH success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Linea, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Linea]),
    tslib_1.__metadata("design:returntype", Promise)
], LineaController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/lineas/{id}'),
    (0, rest_1.response)(204, {
        description: 'Linea PUT success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Linea]),
    tslib_1.__metadata("design:returntype", Promise)
], LineaController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/lineas/{id}'),
    (0, rest_1.response)(204, {
        description: 'Linea DELETE success',
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
], LineaController.prototype, "deleteById", null);
LineaController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.LineaRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.LineaRepository])
], LineaController);
exports.LineaController = LineaController;
//# sourceMappingURL=linea.controller.js.map