import { Entity } from '@loopback/repository';
export declare class Preguntafrecuente extends Entity {
    id?: number;
    mencion?: number;
    pregunta: string;
    respuesta?: string;
    constructor(data?: Partial<Preguntafrecuente>);
}
export interface PreguntafrecuenteRelations {
}
export declare type PreguntafrecuenteWithRelations = Preguntafrecuente & PreguntafrecuenteRelations;
