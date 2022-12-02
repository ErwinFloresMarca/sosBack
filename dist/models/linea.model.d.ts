import { Entity } from '@loopback/repository';
export declare class Linea extends Entity {
    id?: number;
    tipo?: string;
    imgId?: number;
    titulo: string;
    numero: string;
    descripcion?: string;
    constructor(data?: Partial<Linea>);
}
export interface LineaRelations {
}
export declare type LineaWithRelations = Linea & LineaRelations;
