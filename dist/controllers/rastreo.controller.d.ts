import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Rastreo } from '../models';
import { RastreoRepository } from '../repositories';
export declare class RastreoController {
    rastreoRepository: RastreoRepository;
    constructor(rastreoRepository: RastreoRepository);
    create(rastreo: Omit<Rastreo, 'id'>): Promise<Rastreo>;
    count(where?: Where<Rastreo>): Promise<Count>;
    find(filter?: Filter<Rastreo>): Promise<Rastreo[]>;
    findById(id: number, filter?: FilterExcludingWhere<Rastreo>): Promise<Rastreo>;
    updateById(id: number, rastreo: Rastreo): Promise<void>;
    deleteById(id: number): Promise<void>;
}
