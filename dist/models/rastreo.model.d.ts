import { TimeStamp } from './index';
import { Position, PositionWithRelations } from './position.model';
import { UsuarioWithRelations } from './usuario.model';
export declare class Rastreo extends TimeStamp {
    id?: number;
    positions: Position[];
    usuarioId: number;
    constructor(data?: Partial<Rastreo>);
}
export interface RastreoRelations {
    positions?: PositionWithRelations;
    usuario?: UsuarioWithRelations;
}
export declare type RastreoWithRelations = Rastreo & RastreoRelations;
