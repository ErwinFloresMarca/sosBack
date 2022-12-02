import { Entity } from '@loopback/repository';
export declare class Violencia extends Entity {
    id?: number;
    img?: string;
    titulo: string;
    descripcion?: string;
    ejemplos?: string[];
    pasos?: object[];
    contactos?: object[];
    constructor(data?: Partial<Violencia>);
}
export interface ViolenciaRelations {
}
export declare type ViolenciaWithRelations = Violencia & ViolenciaRelations;
