"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifWhatsapp = exports.LoginRequestBody = exports.CredentialsRequestBody = exports.UserProfileSchema = void 0;
exports.UserProfileSchema = {
    type: 'object',
    required: ['id'],
    properties: {
        id: { type: 'number' },
        ci: { type: 'string' },
        usuario: { type: 'string' },
        rol: { type: 'string' },
    },
};
const CredentialsSchema = {
    type: 'object',
    required: ['usuario', 'password'],
    properties: {
        usuario: {
            type: 'string',
            minLength: 8,
        },
        rol: {
            type: 'string',
        },
        nombres: {
            type: 'string',
        },
        paterno: {
            type: 'string',
        },
        materno: {
            type: 'string',
        },
        celular: {
            type: 'string',
        },
        ci: {
            type: 'string',
        },
        password: {
            type: 'string',
            minLength: 8,
        },
    },
};
const LoginCredentialsSchema = {
    type: 'object',
    required: ['usuario', 'password'],
    properties: {
        usuario: {
            type: 'string',
            minLength: 8,
        },
        password: {
            type: 'string',
            minLength: 8,
        },
    },
};
exports.CredentialsRequestBody = {
    description: 'The input of sign up function',
    required: true,
    content: {
        'application/json': { schema: CredentialsSchema },
    },
};
exports.LoginRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': { schema: LoginCredentialsSchema },
    },
};
const NotifyWatsAppSchema = {
    type: 'object',
    required: ['lat', 'lng'],
    properties: {
        lat: {
            type: 'number',
        },
        lng: {
            type: 'number',
        },
    },
};
exports.NotifWhatsapp = {
    description: 'The input of notif function',
    required: true,
    content: {
        'application/json': { schema: NotifyWatsAppSchema },
    },
};
//# sourceMappingURL=user-controller.specs.js.map