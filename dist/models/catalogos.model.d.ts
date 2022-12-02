import { Entity } from '@loopback/repository';
export declare class Catalogos extends Entity {
    id?: number;
    tipo: string;
    nombre: string;
    constructor(data?: Partial<Catalogos>);
}
export interface CatalogosRelations {
}
export declare type CatalogosWithRelations = Catalogos & CatalogosRelations;
