import { TimeStamp } from './time-stamp.model';
export declare class UsuarioCredentials extends TimeStamp {
    id: number;
    password: string;
    usuarioId: number;
    constructor(data?: Partial<UsuarioCredentials>);
}
export interface UsuarioCredentialsRelations {
}
export declare type UsuarioCredentialsWithRelations = UsuarioCredentials & UsuarioCredentialsRelations;
