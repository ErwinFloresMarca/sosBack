import { Parentesco, Usuario } from '../models';
import { ParentescoRepository } from '../repositories';
export declare class ParentescoUsuarioController {
    parentescoRepository: ParentescoRepository;
    constructor(parentescoRepository: ParentescoRepository);
    getUsuario(id: typeof Parentesco.prototype.id): Promise<Usuario>;
}
