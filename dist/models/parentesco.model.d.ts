import { Entity } from '@loopback/repository';
import { UsuarioWithRelations } from './usuario.model';
export declare class Parentesco extends Entity {
    id?: number;
    parentType: string;
    usuarioId: number;
    parentId: number;
    constructor(data?: Partial<Parentesco>);
}
export interface ParentescoRelations {
    parent?: UsuarioWithRelations;
    usuario?: UsuarioWithRelations;
}
export declare type ParentescoWithRelations = Parentesco & ParentescoRelations;
