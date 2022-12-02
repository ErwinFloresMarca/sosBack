import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Parentesco } from '../models';
import { ParentescoRepository } from '../repositories';
export declare class ParentescoController {
    parentescoRepository: ParentescoRepository;
    constructor(parentescoRepository: ParentescoRepository);
    create(parentesco: Omit<Parentesco, 'id'>): Promise<Parentesco>;
    count(where?: Where<Parentesco>): Promise<Count>;
    find(filter?: Filter<Parentesco>): Promise<Parentesco[]>;
    updateAll(parentesco: Parentesco, where?: Where<Parentesco>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Parentesco>): Promise<Parentesco>;
    updateById(id: number, parentesco: Parentesco): Promise<void>;
    replaceById(id: number, parentesco: Parentesco): Promise<void>;
    deleteById(id: number): Promise<void>;
}
