"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const keys_1 = require("../keys");
const auth_midd_1 = require("../middlewares/auth.midd");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const roles_util_1 = tslib_1.__importDefault(require("../utils/roles.util"));
const user_controller_specs_1 = require("./specs/user-controller.specs");
const whatsapp_web_service_1 = require("../services/whatsapp-web.service");
let UsuarioController = class UsuarioController {
    constructor(usuarioRepository, parentescoRepository, passwordHasher, jwtService, userService, whatsappWebService) {
        this.usuarioRepository = usuarioRepository;
        this.parentescoRepository = parentescoRepository;
        this.passwordHasher = passwordHasher;
        this.jwtService = jwtService;
        this.userService = userService;
        this.whatsappWebService = whatsappWebService;
    }
    // TODO: proteccion de cantidad de usuarios registrados
    // @authenticate('jwt')
    // @authorize({
    //   allowedRoles: [Roles.admin],
    //   voters: [basicAuthorization],
    // })
    async count(where) {
        return this.usuarioRepository.count(where);
    }
    async find(filter) {
        return this.usuarioRepository.find(filter);
    }
    async updateById(id, user) {
        user.updatedAt = new Date().toISOString();
        await this.usuarioRepository.updateById(id, user);
    }
    async updatePasswordById(id, data) {
        // encrypt the password
        const password = await this.passwordHasher.hashPassword(data.password);
        await this.usuarioRepository.usuarioCredentials(id).patch({ password });
    }
    async create(newUserRequest) {
        const cantUsers = await this.usuarioRepository.count();
        // por defecto
        if (cantUsers.count === 0)
            newUserRequest.rol = roles_util_1.default.admin;
        else
            newUserRequest.rol = roles_util_1.default.user;
        // ensure a valid email value and password value
        (0, services_1.validateCredentials)(lodash_1.default.pick(newUserRequest, ['usuario', 'password']));
        // encrypt the password
        const password = await this.passwordHasher.hashPassword(newUserRequest.password);
        try {
            // create the new user
            const savedUser = await this.usuarioRepository.create(lodash_1.default.omit(newUserRequest, 'password'));
            // set the password
            await this.usuarioRepository
                .usuarioCredentials(savedUser.id)
                .create({ password });
            return savedUser;
        }
        catch (error) {
            // MongoError 11000 duplicate key
            if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
                throw new rest_1.HttpErrors.Conflict('Email value is already taken');
            }
            else {
                throw error;
            }
        }
    }
    async createAdmin(newUserRequest) {
        // All new users have the "customer" rol by default
        newUserRequest.rol = 'admin';
        // ensure a valid email value and password value
        (0, services_1.validateCredentials)(lodash_1.default.pick(newUserRequest, ['usuario', 'password']));
        // encrypt the password
        const password = await this.passwordHasher.hashPassword(newUserRequest.password);
        try {
            const cantUsers = (await this.usuarioRepository.count()).count;
            if (cantUsers > 0) {
                throw new Error('Ya existe un usuario administrador.');
            }
            // create the new user
            const savedUser = await this.usuarioRepository.create(lodash_1.default.omit(newUserRequest, 'password'));
            // set the password
            await this.usuarioRepository
                .usuarioCredentials(savedUser.id)
                .create({ password });
            return savedUser;
        }
        catch (error) {
            // MongoError 11000 duplicate key
            if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
                throw new rest_1.HttpErrors.Conflict('Email value is already taken');
            }
            else {
                throw new rest_1.HttpErrors.Unauthorized(error);
            }
        }
    }
    async findById(userId) {
        return this.usuarioRepository.findById(userId);
    }
    async printCurrentUser(currentUserProfile) {
        const userId = currentUserProfile[security_1.securityId];
        return this.usuarioRepository.findById(parseInt(userId));
    }
    async login(loginCredentials) {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(loginCredentials);
        // convert a Usuario object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return {
            token,
            usuario: await this.usuarioRepository.findById(user.id),
        };
    }
    async sendNotificationW(id, ubicationData) {
        console.log('request', ubicationData);
        const usuario = await this.usuarioRepository.findById(id);
        const parientes = await this.parentescoRepository.find({
            where: {
                or: [
                    {
                        usuarioId: usuario.id,
                    },
                    {
                        parentId: usuario.id,
                    },
                ]
            },
            include: ['parent', 'usuario'],
        });
        const sendMessages = [];
        await Promise.all(parientes.map(async (p) => {
            var _a, _b, _c, _d, _e;
            if (p.usuarioId === usuario.id) {
                if ((_a = p.parent) === null || _a === void 0 ? void 0 : _a.celular) {
                    await this.whatsappWebService.sendMessage(`591${(_b = p.parent) === null || _b === void 0 ? void 0 : _b.celular}`, `Hola soy *${usuario.nombres} ${usuario.paterno} ${usuario.materno}* necesito ayuda, mi ubicación es https://www.google.com/maps/search/?api=1&query=${ubicationData.lat},${ubicationData.lng}.`).then(message => {
                        var _a;
                        sendMessages.push(`591${(_a = p.parent) === null || _a === void 0 ? void 0 : _a.celular}`);
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }
            else {
                console.log('usuario:', (_c = p.usuario) === null || _c === void 0 ? void 0 : _c.celular);
                if ((_d = p.usuario) === null || _d === void 0 ? void 0 : _d.celular) {
                    await this.whatsappWebService.sendMessage(`591${(_e = p.usuario) === null || _e === void 0 ? void 0 : _e.celular}`, `Hola soy *${usuario.nombres} ${usuario.paterno} ${usuario.materno}* necesito ayuda, mi ubicación es https://www.google.com/maps/search/?api=1&query=${ubicationData.lat},${ubicationData.lng}.`).then(resp => {
                        var _a;
                        if (!resp.error)
                            sendMessages.push(`591${(_a = p.usuario) === null || _a === void 0 ? void 0 : _a.celular}`);
                        return resp;
                    }).catch(err => {
                        console.log(err);
                        return err;
                    });
                }
            }
            return p;
        }));
        return { message: 'Mensajes enviados', sends: sendMessages };
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/usuarios/count'),
    (0, rest_1.response)(200, {
        description: 'Usuario model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Usuario)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/usuarios'),
    (0, rest_1.response)(200, {
        description: 'Array of Usuario model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Usuario, { includeRelations: true }),
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.filter(models_1.Usuario)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/usuarios/{id}'),
    (0, rest_1.response)(204, {
        description: 'Usuario PATCH success',
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Usuario, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Usuario]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/usuarios/{id}/change-password'),
    (0, rest_1.response)(204, {
        description: 'Usuario PATCH success',
    }),
    (0, authorization_1.authorize)({
        allowedRoles: [roles_util_1.default.admin],
        voters: [auth_midd_1.basicAuthorization],
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['password'],
                    properties: {
                        password: {
                            type: 'string',
                            minLength: 8,
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "updatePasswordById", null);
tslib_1.__decorate([
    (0, rest_1.post)('/usuarios/sign-up', {
        responses: {
            '200': {
                description: 'Usuario',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.Usuario,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)(user_controller_specs_1.CredentialsRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.post)('/usuarios/sign-up/admin', {
        responses: {
            '200': {
                description: 'Usuario',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.Usuario,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)(user_controller_specs_1.CredentialsRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "createAdmin", null);
tslib_1.__decorate([
    (0, rest_1.get)('/usuarios/{userId}', {
        responses: {
            '200': {
                description: 'Usuario',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.Usuario,
                        },
                    },
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.get)('/usuarios/me', {
        responses: {
            '200': {
                description: 'The current user profile',
                content: {
                    'application/json': {
                        schema: user_controller_specs_1.UserProfileSchema,
                    },
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, core_1.inject)(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "printCurrentUser", null);
tslib_1.__decorate([
    (0, rest_1.post)('/usuarios/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)(user_controller_specs_1.LoginRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "login", null);
tslib_1.__decorate([
    (0, rest_1.post)('/user/{id}/send-not-what', {
        responses: {
            '200': {
                description: 'Send notification whatsapp',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {},
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)(user_controller_specs_1.NotifWhatsapp)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsuarioController.prototype, "sendNotificationW", null);
UsuarioController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UsuarioRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.ParentescoRepository)),
    tslib_1.__param(2, (0, core_1.inject)(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    tslib_1.__param(3, (0, core_1.inject)(keys_1.TokenServiceBindings.TOKEN_SERVICE)),
    tslib_1.__param(4, (0, core_1.inject)(keys_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__param(5, (0, core_1.inject)(whatsapp_web_service_1.WhatsAppWebServiceBindingKey)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UsuarioRepository,
        repositories_1.ParentescoRepository, Object, Object, Object, whatsapp_web_service_1.WhatsAppWebService])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map