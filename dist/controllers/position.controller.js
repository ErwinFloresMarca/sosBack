"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const auth_midd_1 = require("../middlewares/auth.midd");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const roles_util_1 = tslib_1.__importDefault(require("../utils/roles.util"));
let PositionController = class PositionController {
    constructor(positionRepository) {
        this.positionRepository = positionRepository;
    }
    async create(position) {
        return this.positionRepository.create(position);
    }
    async count(where) {
        return this.positionRepository.count(where);
    }
    async find(filter) {
        return this.positionRepository.find(filter);
    }
    async updateAll(position, where) {
        return this.positionRepository.updateAll(position, where);
    }
    async findById(id, filter) {
        return this.positionRepository.findById(id, filter);
    }
    async updateById(id, position) {
        await this.positionRepository.updateById(id, position);
    }
    async replaceById(id, position) {
        await this.positionRepository.replaceById(id, position);
    }
    async deleteById(id) {
        await this.positionRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/positions'),
    (0, rest_1.response)(200, {
        description: 'Position model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Position) } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Position, {
                    title: 'NewPosition',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PositionController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/positions/count'),
    (0, rest_1.response)(200, {
        description: 'Position model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.where(models_1.Position)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PositionController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/positions'),
    (0, rest_1.response)(200, {
        description: 'Array of Position model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Position, { includeRelations: true }),
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.filter(models_1.Position)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PositionController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/positions'),
    (0, rest_1.response)(200, {
        description: 'Position PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Position, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Position)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Position, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PositionController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/positions/{id}'),
    (0, rest_1.response)(200, {
        description: 'Position model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Position, { includeRelations: true }),
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Position, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PositionController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/positions/{id}'),
    (0, rest_1.response)(204, {
        description: 'Position PATCH success',
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Position]),
    tslib_1.__metadata("design:returntype", Promise)
], PositionController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/positions/{id}'),
    (0, rest_1.response)(204, {
        description: 'Position PUT success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Position]),
    tslib_1.__metadata("design:returntype", Promise)
], PositionController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/positions/{id}'),
    (0, rest_1.response)(204, {
        description: 'Position DELETE success',
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
], PositionController.prototype, "deleteById", null);
PositionController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.PositionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PositionRepository])
], PositionController);
exports.PositionController = PositionController;
//# sourceMappingURL=position.controller.js.map