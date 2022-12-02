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
  Rastreo,
} from '../models';
import {UsuarioRepository} from '../repositories';
import Roles from '../utils/roles.util';

export class UsuarioRastreoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/rastreos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Rastreo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rastreo)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Rastreo>,
  ): Promise<Rastreo[]> {
    return this.usuarioRepository.rastreos(id).find(filter);
  }

  @post('/usuarios/{id}/rastreos', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rastreo)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rastreo, {
            title: 'NewRastreoInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) rastreo: Omit<Rastreo, 'id'>,
  ): Promise<Rastreo> {
    return this.usuarioRepository.rastreos(id).create(rastreo);
  }

  @patch('/usuarios/{id}/rastreos', {
    responses: {
      '200': {
        description: 'Usuario.Rastreo PATCH success count',
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
          schema: getModelSchemaRef(Rastreo, {partial: true}),
        },
      },
    })
    rastreo: Partial<Rastreo>,
    @param.query.object('where', getWhereSchemaFor(Rastreo)) where?: Where<Rastreo>,
  ): Promise<Count> {
    return this.usuarioRepository.rastreos(id).patch(rastreo, where);
  }

  @del('/usuarios/{id}/rastreos', {
    responses: {
      '200': {
        description: 'Usuario.Rastreo DELETE success count',
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
    @param.query.object('where', getWhereSchemaFor(Rastreo)) where?: Where<Rastreo>,
  ): Promise<Count> {
    return this.usuarioRepository.rastreos(id).delete(where);
  }
}
