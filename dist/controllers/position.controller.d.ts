import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Position } from '../models';
import { PositionRepository } from '../repositories';
export declare class PositionController {
    positionRepository: PositionRepository;
    constructor(positionRepository: PositionRepository);
    create(position: Omit<Position, 'id'>): Promise<Position>;
    count(where?: Where<Position>): Promise<Count>;
    find(filter?: Filter<Position>): Promise<Position[]>;
    updateAll(position: Position, where?: Where<Position>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Position>): Promise<Position>;
    updateById(id: number, position: Position): Promise<void>;
    replaceById(id: number, position: Position): Promise<void>;
    deleteById(id: number): Promise<void>;
}
