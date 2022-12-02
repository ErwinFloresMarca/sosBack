import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Catalogos } from '../models';
import { CatalogosRepository } from '../repositories';
export declare class CatalogoController {
    catalogosRepository: CatalogosRepository;
    constructor(catalogosRepository: CatalogosRepository);
    create(catalogos: Omit<Catalogos, 'id'>): Promise<Catalogos>;
    count(where?: Where<Catalogos>): Promise<Count>;
    find(filter?: Filter<Catalogos>): Promise<Catalogos[]>;
    findById(id: number, filter?: FilterExcludingWhere<Catalogos>): Promise<Catalogos>;
    updateById(id: number, catalogos: Catalogos): Promise<void>;
    deleteById(id: number): Promise<void>;
}
