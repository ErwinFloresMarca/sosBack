import { Count, Filter, Where } from '@loopback/repository';
import { Usuario, Parentesco } from '../models';
import { UsuarioRepository } from '../repositories';
export declare class UsuarioParentescoController {
    protected usuarioRepository: UsuarioRepository;
    constructor(usuarioRepository: UsuarioRepository);
    find(id: number, filter?: Filter<Parentesco>): Promise<Parentesco[]>;
    create(id: typeof Usuario.prototype.id, parentesco: Omit<Parentesco, 'id'>): Promise<Parentesco>;
    patch(id: number, parentesco: Partial<Parentesco>, where?: Where<Parentesco>): Promise<Count>;
    delete(id: number, where?: Where<Parentesco>): Promise<Count>;
}
