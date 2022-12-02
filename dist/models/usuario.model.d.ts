import { TimeStamp } from './time-stamp.model';
import { UsuarioCredentials } from './usuario-credentials.model';
import { Rastreo, RastreoWithRelations } from './rastreo.model';
import { Parentesco } from './parentesco.model';
export declare class Usuario extends TimeStamp {
    id: number;
    nombres: string;
    paterno: string;
    materno: string;
    ci: string;
    celular: string;
    usuario: string;
    email: string;
    avatar?: string;
    rol: string;
    rastreoEnLinea: boolean;
    fechaNacimiento: Date;
    usuarioCredentials: UsuarioCredentials;
    rastreos: Rastreo[];
    parentescos: Parentesco[];
    constructor(data?: Partial<Usuario>);
}
export interface UsuarioRelations {
    rastreos?: RastreoWithRelations[];
}
export declare type UsuarioWithRelations = Usuario & UsuarioRelations;
