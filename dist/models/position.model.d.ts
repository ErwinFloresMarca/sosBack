import { Entity } from '@loopback/repository';
export declare class Position extends Entity {
    id?: number;
    rastreoId?: number;
    position: string;
    createdAt?: string;
    constructor(data?: Partial<Position>);
}
export interface PositionRelations {
}
export declare type PositionWithRelations = Position & PositionRelations;
