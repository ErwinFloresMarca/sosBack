import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Institucion } from '../models';
import { InstitucionRepository } from '../repositories';
export declare class InstitucionController {
    institucionRepository: InstitucionRepository;
    constructor(institucionRepository: InstitucionRepository);
    create(institucion: Omit<Institucion, 'id'>): Promise<Institucion>;
    count(where?: Where<Institucion>): Promise<Count>;
    find(filter?: Filter<Institucion>): Promise<Institucion[]>;
    updateAll(institucion: Institucion, where?: Where<Institucion>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Institucion>): Promise<Institucion>;
    updateById(id: number, institucion: Institucion): Promise<void>;
    replaceById(id: number, institucion: Institucion): Promise<void>;
    deleteById(id: number): Promise<void>;
}
