import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Linea } from '../models';
import { LineaRepository } from '../repositories';
export declare class LineaController {
    lineaRepository: LineaRepository;
    constructor(lineaRepository: LineaRepository);
    create(linea: Omit<Linea, 'id'>): Promise<Linea>;
    count(where?: Where<Linea>): Promise<Count>;
    find(filter?: Filter<Linea>): Promise<Linea[]>;
    updateAll(linea: Linea, where?: Where<Linea>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Linea>): Promise<Linea>;
    updateById(id: number, linea: Linea): Promise<void>;
    replaceById(id: number, linea: Linea): Promise<void>;
    deleteById(id: number): Promise<void>;
}
