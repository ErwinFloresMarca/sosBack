import { UserService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { Usuario } from '../models';
import { Credentials, UsuarioRepository } from '../repositories';
import { PasswordHasher } from './hash-password.service';
export declare class MyUserService implements UserService<Usuario, Credentials> {
    userRepository: UsuarioRepository;
    passwordHasher: PasswordHasher;
    constructor(userRepository: UsuarioRepository, passwordHasher: PasswordHasher);
    verifyCredentials(credentials: Credentials): Promise<Usuario>;
    convertToUserProfile(user: Usuario): UserProfile;
}
