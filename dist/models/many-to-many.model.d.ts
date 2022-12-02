import { Model } from '@loopback/repository';
export declare class ManyToMany extends Model {
    relationId: number;
    link: boolean;
    constructor(data?: Partial<ManyToMany>);
}
export interface ManyToManyRelations {
}
export declare type ManyToManyWithRelations = ManyToMany & ManyToManyRelations;
