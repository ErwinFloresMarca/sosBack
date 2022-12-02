import {
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  DataObject,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  UserServiceBindings,
} from '../keys';
import {basicAuthorization} from '../middlewares/auth.midd';
import {Usuario} from '../models';
import {
  Credentials,
  LoginCredentials,
  ParentescoRepository,
  UsuarioRepository,
} from '../repositories';
import {PasswordHasher, validateCredentials} from '../services';
import Roles from '../utils/roles.util';
import {
  CredentialsRequestBody,
  LoginRequestBody,
  NotifWhatsapp,
  UserProfileSchema,
} from './specs/user-controller.specs';

import { WhatsAppWebService, WhatsAppWebServiceBindingKey } from '../services/whatsapp-web.service';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository) public usuarioRepository: UsuarioRepository,
    @repository(ParentescoRepository) public parentescoRepository: ParentescoRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<Usuario, Credentials>,
    @inject(WhatsAppWebServiceBindingKey)
    public whatsappWebService: WhatsAppWebService,
  ) {}

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  // TODO: proteccion de cantidad de usuarios registrados
  // @authenticate('jwt')
  // @authorize({
  //   allowedRoles: [Roles.admin],
  //   voters: [basicAuthorization],
  // })
  async count(@param.where(Usuario) where?: Where<Usuario>): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  @authenticate('jwt')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    user: Usuario,
  ): Promise<void> {
    user.updatedAt = new Date().toISOString();
    await this.usuarioRepository.updateById(id, user);
  }

  @patch('/usuarios/{id}/change-password')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  @authorize({
    allowedRoles: [Roles.admin],
    voters: [basicAuthorization],
  })
  @authenticate('jwt')
  async updatePasswordById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['password'],
            properties: {
              password: {
                type: 'string',
                minLength: 8,
              },
            },
          },
        },
      },
    })
    data: {password: string},
  ): Promise<void> {
    // encrypt the password
    const password = await this.passwordHasher.hashPassword(data.password);

    await this.usuarioRepository.usuarioCredentials(id).patch({password});
  }

  @post('/usuarios/sign-up', {
    responses: {
      '200': {
        description: 'Usuario',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': Usuario,
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody(CredentialsRequestBody)
    newUserRequest: Credentials,
  ): Promise<Usuario> {
    const cantUsers = await this.usuarioRepository.count();

    // por defecto
    if (cantUsers.count === 0) newUserRequest.rol = Roles.admin;
    else newUserRequest.rol = Roles.user;

    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['usuario', 'password']));

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );

    try {
      // create the new user
      const savedUser = await this.usuarioRepository.create(
        _.omit(newUserRequest, 'password') as DataObject<Usuario>,
      );

      // set the password
      await this.usuarioRepository
        .usuarioCredentials(savedUser.id)
        .create({password});

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @post('/usuarios/sign-up/admin', {
    responses: {
      '200': {
        description: 'Usuario',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': Usuario,
            },
          },
        },
      },
    },
  })
  async createAdmin(
    @requestBody(CredentialsRequestBody)
    newUserRequest: Credentials,
  ): Promise<Usuario> {
    // All new users have the "customer" rol by default
    newUserRequest.rol = 'admin';
    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['usuario', 'password']));

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );

    try {
      const cantUsers = (await this.usuarioRepository.count()).count;
      if (cantUsers > 0) {
        throw new Error('Ya existe un usuario administrador.');
      }
      // create the new user
      const savedUser = await this.usuarioRepository.create(
        _.omit(newUserRequest, 'password') as DataObject<Usuario>,
      );
      // set the password
      await this.usuarioRepository
        .usuarioCredentials(savedUser.id)
        .create({password});

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw new HttpErrors.Unauthorized(error);
      }
    }
  }

  @get('/usuarios/{userId}', {
    responses: {
      '200': {
        description: 'Usuario',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': Usuario,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.number('userId') userId: number,
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(userId);
  }

  @get('/usuarios/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<Usuario> {
    const userId = currentUserProfile[securityId];
    return this.usuarioRepository.findById(parseInt(userId));
  }

  @post('/usuarios/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(LoginRequestBody) loginCredentials: LoginCredentials,
  ): Promise<{token: string; usuario: Usuario}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(loginCredentials);

    // convert a Usuario object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return {
      token,
      usuario: await this.usuarioRepository.findById(user.id),
    };
  } 

  @post('/user/{id}/send-not-what', {
    responses: {
      '200': {
        description: 'Send notification whatsapp',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
              },
            },
          },
        },
      },
    },
  })
  async sendNotificationW(
    @param.path.number('id') id: number,
    @requestBody(NotifWhatsapp) ubicationData: {lat: number, lng: number},
  ) {
    console.log('request', ubicationData);
    const usuario = await this.usuarioRepository.findById(id);
    const parientes = await this.parentescoRepository.find({
      where: {
        or: [
          {
            usuarioId: usuario.id,
          },
          {
            parentId: usuario.id,
          },
        ]
      },
      include: ['parent', 'usuario'],
    });

    const sendMessages: string[] = [];
    await Promise.all(parientes.map(async (p) => {
      if(p.usuarioId === usuario.id){
        if(p.parent?.celular){
          await this.whatsappWebService.sendMessage(
            `591${p.parent?.celular}`,
            `Hola soy *${usuario.nombres} ${usuario.paterno} ${usuario.materno}* necesito ayuda, mi ubicación es https://www.google.com/maps/search/?api=1&query=${ubicationData.lat},${ubicationData.lng}.`
          ).then(message => {
            sendMessages.push(`591${p.parent?.celular}`);
          }).catch(err => {
            console.log(err);
          });
        }
      } else {
        console.log('usuario:', p.usuario?.celular);
        if(p.usuario?.celular){
          await this.whatsappWebService.sendMessage(
            `591${p.usuario?.celular}`,
            `Hola soy *${usuario.nombres} ${usuario.paterno} ${usuario.materno}* necesito ayuda, mi ubicación es https://www.google.com/maps/search/?api=1&query=${ubicationData.lat},${ubicationData.lng}.`
          ).then(resp => {
            if(!resp.error)
              sendMessages.push(`591${p.usuario?.celular}`);
            return resp;
          }).catch(err => {
            console.log(err);
            return err;
          });
        }
      }
      return p;
    }));
    
    return {message: 'Mensajes enviados', sends: sendMessages};
  }
}
