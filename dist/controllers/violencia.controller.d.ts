import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Violencia } from '../models';
import { ViolenciaRepository } from '../repositories';
export declare class ViolenciaController {
    violenciaRepository: ViolenciaRepository;
    constructor(violenciaRepository: ViolenciaRepository);
    create(violencia: Omit<Violencia, 'id'>): Promise<Violencia>;
    count(where?: Where<Violencia>): Promise<Count>;
    find(filter?: Filter<Violencia>): Promise<Violencia[]>;
    updateAll(violencia: Violencia, where?: Where<Violencia>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Violencia>): Promise<Violencia>;
    updateById(id: number, violencia: Violencia): Promise<void>;
    replaceById(id: number, violencia: Violencia): Promise<void>;
    deleteById(id: number): Promise<void>;
}
