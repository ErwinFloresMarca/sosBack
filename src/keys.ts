import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/context';
import {Usuario} from './models';
import {Credentials} from './repositories';
import {PasswordHasher} from './services';

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = process.env.JWT_SECRET
    ? process.env.JWT_SECRET
    : 'myjwts3cr3t';
  export const TOKEN_EXPIRES_IN_VALUE = process.env.JWT_EXPIRES_IN
    ? process.env.JWT_EXPIRES_IN
    : '36000';
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER =
    BindingKey.create<PasswordHasher>('services.hasher');
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<
    UserService<Usuario, Credentials>
  >('services.user.service');
}

// file service

import {FileUploadHandler} from './types'; // Binding key for the file upload service
export const FILE_UPLOAD_SERVICE = BindingKey.create<FileUploadHandler>(
  'services.FileUpload',
); // Binding key for the storage directory
export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');
