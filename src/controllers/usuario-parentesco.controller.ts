import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import { basicAuthorization } from '../middlewares/auth.midd';
import {
  Usuario,
  Parentesco,
} from '../models';
import {UsuarioRepository} from '../repositories';
import Roles from '../utils/roles.util';

export class UsuarioParentescoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/parentescos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Parentesco',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parentesco)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Parentesco>,
  ): Promise<Parentesco[]> {
    return this.usuarioRepository.parentescos(id).find(filter);
  }

  @post('/usuarios/{id}/parentescos', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parentesco)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parentesco, {
            title: 'NewParentescoInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) parentesco: Omit<Parentesco, 'id'>,
  ): Promise<Parentesco> {
    return this.usuarioRepository.parentescos(id).create(parentesco);
  }

  @patch('/usuarios/{id}/parentescos', {
    responses: {
      '200': {
        description: 'Usuario.Parentesco PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parentesco, {partial: true}),
        },
      },
    })
    parentesco: Partial<Parentesco>,
    @param.query.object('where', getWhereSchemaFor(Parentesco)) where?: Where<Parentesco>,
  ): Promise<Count> {
    return this.usuarioRepository.parentescos(id).patch(parentesco, where);
  }

  @del('/usuarios/{id}/parentescos', {
    responses: {
      '200': {
        description: 'Usuario.Parentesco DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Roles.admin],
    voters: [basicAuthorization],
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Parentesco)) where?: Where<Parentesco>,
  ): Promise<Count> {
    return this.usuarioRepository.parentescos(id).delete(where);
  }
}
