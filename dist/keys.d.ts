import { TokenService, UserService } from '@loopback/authentication';
import { BindingKey } from '@loopback/context';
import { Usuario } from './models';
import { Credentials } from './repositories';
import { PasswordHasher } from './services';
export declare namespace TokenServiceConstants {
    const TOKEN_SECRET_VALUE: string;
    const TOKEN_EXPIRES_IN_VALUE: string;
}
export declare namespace TokenServiceBindings {
    const TOKEN_SECRET: BindingKey<string>;
    const TOKEN_EXPIRES_IN: BindingKey<string>;
    const TOKEN_SERVICE: BindingKey<TokenService>;
}
export declare namespace PasswordHasherBindings {
    const PASSWORD_HASHER: BindingKey<PasswordHasher<string>>;
    const ROUNDS: BindingKey<number>;
}
export declare namespace UserServiceBindings {
    const USER_SERVICE: BindingKey<UserService<Usuario, Credentials>>;
}
import { FileUploadHandler } from './types';
export declare const FILE_UPLOAD_SERVICE: BindingKey<FileUploadHandler>;
export declare const STORAGE_DIRECTORY: BindingKey<string>;
