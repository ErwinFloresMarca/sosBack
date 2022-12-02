import { Count, Filter, Where } from '@loopback/repository';
import { Usuario, Rastreo } from '../models';
import { UsuarioRepository } from '../repositories';
export declare class UsuarioRastreoController {
    protected usuarioRepository: UsuarioRepository;
    constructor(usuarioRepository: UsuarioRepository);
    find(id: number, filter?: Filter<Rastreo>): Promise<Rastreo[]>;
    create(id: typeof Usuario.prototype.id, rastreo: Omit<Rastreo, 'id'>): Promise<Rastreo>;
    patch(id: number, rastreo: Partial<Rastreo>, where?: Where<Rastreo>): Promise<Count>;
    delete(id: number, where?: Where<Rastreo>): Promise<Count>;
}
