"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentescoUsuarioController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ParentescoUsuarioController = class ParentescoUsuarioController {
    constructor(parentescoRepository) {
        this.parentescoRepository = parentescoRepository;
    }
    async getUsuario(id) {
        return this.parentescoRepository.usuario(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/parentescos/{id}/usuario', {
        responses: {
            '200': {
                description: 'Usuario belonging to Parentesco',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Usuario) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ParentescoUsuarioController.prototype, "getUsuario", null);
ParentescoUsuarioController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ParentescoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ParentescoRepository])
], ParentescoUsuarioController);
exports.ParentescoUsuarioController = ParentescoUsuarioController;
//# sourceMappingURL=parentesco-usuario.controller.js.map