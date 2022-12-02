import { Count, Filter, Where } from '@loopback/repository';
import { Rastreo, Position } from '../models';
import { RastreoRepository } from '../repositories';
export declare class RastreoPositionController {
    protected rastreoRepository: RastreoRepository;
    constructor(rastreoRepository: RastreoRepository);
    find(id: number, filter?: Filter<Position>): Promise<Position[]>;
    create(id: typeof Rastreo.prototype.id, position: Omit<Position, 'id'>): Promise<Position>;
    patch(id: number, position: Partial<Position>, where?: Where<Position>): Promise<Count>;
    delete(id: number, where?: Where<Position>): Promise<Count>;
}
