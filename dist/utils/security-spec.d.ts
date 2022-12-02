import { ReferenceObject, SecuritySchemeObject } from '@loopback/openapi-v3';
export declare const SECURITY_SPEC: {
    bearerAuth: never[];
}[];
export declare type SecuritySchemeObjects = {
    [securityScheme: string]: SecuritySchemeObject | ReferenceObject;
};
export declare const SECURITY_SCHEME_SPEC: SecuritySchemeObjects;
