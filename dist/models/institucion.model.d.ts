import { Entity } from '@loopback/repository';
export declare class Institucion extends Entity {
    id?: number;
    posicionGegrafica?: string;
    nombre: string;
    servicio: string;
    direccion: string;
    telefono?: string;
    constructor(data?: Partial<Institucion>);
}
export interface InstitucionRelations {
}
export declare type InstitucionWithRelations = Institucion & InstitucionRelations;
