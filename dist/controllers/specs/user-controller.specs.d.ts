import { SchemaObject } from '@loopback/rest';
export declare const UserProfileSchema: {
    type: string;
    required: string[];
    properties: {
        id: {
            type: string;
        };
        ci: {
            type: string;
        };
        usuario: {
            type: string;
        };
        rol: {
            type: string;
        };
    };
};
export declare const CredentialsRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
        };
    };
};
export declare const LoginRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
        };
    };
};
export declare const NotifWhatsapp: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
        };
    };
};
