"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CatalogoController = class CatalogoController {
    constructor(catalogosRepository) {
        this.catalogosRepository = catalogosRepository;
    }
    async create(catalogos) {
        return this.catalogosRepository.create(catalogos);
    }
    async count(where) {
        return this.catalogosRepository.count(where);
    }
    async find(filter) {
        return this.catalogosRepository.find(filter);
    }
    async findById(id, filter) {
        return this.catalogosRepository.findById(id, filter);
    }
    async updateById(id, catalogos) {
        await this.catalogosRepository.updateById(id, catalogos);
    }
    async deleteById(id) {
        await this.catalogosRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/catalogos'),
    (0, rest_1.response)(200, {
        description: 'Catalogos model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Catalogos) } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Catalogos, {
                    title: 'NewCatalogos',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CatalogoController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/catalogos/count'),
    (0, rest_1.response)(200, {
        description: 'Catalogos model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.where(models_1.Catalogos)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CatalogoController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/catalogos'),
    (0, rest_1.response)(200, {
        description: 'Array of Catalogos model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Catalogos, { includeRelations: true }),
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.filter(models_1.Catalogos)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CatalogoController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.get)('/catalogos/{id}'),
    (0, rest_1.response)(200, {
        description: 'Catalogos model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Catalogos, { includeRelations: true }),
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Catalogos, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CatalogoController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/catalogos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Catalogos PATCH success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Catalogos, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Catalogos]),
    tslib_1.__metadata("design:returntype", Promise)
], CatalogoController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/catalogos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Catalogos DELETE success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CatalogoController.prototype, "deleteById", null);
CatalogoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.CatalogosRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CatalogosRepository])
], CatalogoController);
exports.CatalogoController = CatalogoController;
//# sourceMappingURL=catalogo.controller.js.map