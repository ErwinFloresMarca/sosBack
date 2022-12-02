import { Entity } from '@loopback/repository';
export declare class TimeStamp extends Entity {
    estado?: boolean;
    createdAt?: string;
    updatedAt?: string;
    constructor(data?: Partial<TimeStamp>);
}
export interface TimeStampRelations {
}
export declare type TimeStampWithRelations = TimeStamp & TimeStampRelations;
