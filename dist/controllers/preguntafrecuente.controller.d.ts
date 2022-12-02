import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Preguntafrecuente } from '../models';
import { PreguntafrecuenteRepository } from '../repositories';
export declare class PreguntafrecuenteController {
    preguntafrecuenteRepository: PreguntafrecuenteRepository;
    constructor(preguntafrecuenteRepository: PreguntafrecuenteRepository);
    create(preguntafrecuente: Omit<Preguntafrecuente, 'id'>): Promise<Preguntafrecuente>;
    count(where?: Where<Preguntafrecuente>): Promise<Count>;
    find(filter?: Filter<Preguntafrecuente>): Promise<Preguntafrecuente[]>;
    updateAll(preguntafrecuente: Preguntafrecuente, where?: Where<Preguntafrecuente>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Preguntafrecuente>): Promise<Preguntafrecuente>;
    updateById(id: number, preguntafrecuente: Preguntafrecuente): Promise<void>;
    replaceById(id: number, preguntafrecuente: Preguntafrecuente): Promise<void>;
    deleteById(id: number): Promise<void>;
}
