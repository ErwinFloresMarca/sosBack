import { TokenService, UserService } from '@loopback/authentication';
import { Count, Filter, Where } from '@loopback/repository';
import { UserProfile } from '@loopback/security';
import { Usuario } from '../models';
import { Credentials, LoginCredentials, ParentescoRepository, UsuarioRepository } from '../repositories';
import { PasswordHasher } from '../services';
import { WhatsAppWebService } from '../services/whatsapp-web.service';
export declare class UsuarioController {
    usuarioRepository: UsuarioRepository;
    parentescoRepository: ParentescoRepository;
    passwordHasher: PasswordHasher;
    jwtService: TokenService;
    userService: UserService<Usuario, Credentials>;
    whatsappWebService: WhatsAppWebService;
    constructor(usuarioRepository: UsuarioRepository, parentescoRepository: ParentescoRepository, passwordHasher: PasswordHasher, jwtService: TokenService, userService: UserService<Usuario, Credentials>, whatsappWebService: WhatsAppWebService);
    count(where?: Where<Usuario>): Promise<Count>;
    find(filter?: Filter<Usuario>): Promise<Usuario[]>;
    updateById(id: number, user: Usuario): Promise<void>;
    updatePasswordById(id: number, data: {
        password: string;
    }): Promise<void>;
    create(newUserRequest: Credentials): Promise<Usuario>;
    createAdmin(newUserRequest: Credentials): Promise<Usuario>;
    findById(userId: number): Promise<Usuario>;
    printCurrentUser(currentUserProfile: UserProfile): Promise<Usuario>;
    login(loginCredentials: LoginCredentials): Promise<{
        token: string;
        usuario: Usuario;
    }>;
    sendNotificationW(id: number, ubicationData: {
        lat: number;
        lng: number;
    }): Promise<{
        message: string;
        sends: string[];
    }>;
}
