import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { basicAuthorization } from '../middlewares/auth.midd';
import {Preguntafrecuente} from '../models';
import {PreguntafrecuenteRepository} from '../repositories';
import Roles from '../utils/roles.util';

export class PreguntafrecuenteController {
  constructor(
    @repository(PreguntafrecuenteRepository)
    public preguntafrecuenteRepository : PreguntafrecuenteRepository,
  ) {}

  @post('/preguntafrecuentes')
  @response(200, {
    description: 'Preguntafrecuente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Preguntafrecuente)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preguntafrecuente, {
            title: 'NewPreguntafrecuente',
            exclude: ['id'],
          }),
        },
      },
    })
    preguntafrecuente: Omit<Preguntafrecuente, 'id'>,
  ): Promise<Preguntafrecuente> {
    return this.preguntafrecuenteRepository.create(preguntafrecuente);
  }

  @get('/preguntafrecuentes/count')
  @response(200, {
    description: 'Preguntafrecuente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  async count(
    @param.where(Preguntafrecuente) where?: Where<Preguntafrecuente>,
  ): Promise<Count> {
    return this.preguntafrecuenteRepository.count(where);
  }

  @get('/preguntafrecuentes')
  @response(200, {
    description: 'Array of Preguntafrecuente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Preguntafrecuente, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(Preguntafrecuente) filter?: Filter<Preguntafrecuente>,
  ): Promise<Preguntafrecuente[]> {
    return this.preguntafrecuenteRepository.find(filter);
  }

  @patch('/preguntafrecuentes')
  @response(200, {
    description: 'Preguntafrecuente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preguntafrecuente, {partial: true}),
        },
      },
    })
    preguntafrecuente: Preguntafrecuente,
    @param.where(Preguntafrecuente) where?: Where<Preguntafrecuente>,
  ): Promise<Count> {
    return this.preguntafrecuenteRepository.updateAll(preguntafrecuente, where);
  }

  @get('/preguntafrecuentes/{id}')
  @response(200, {
    description: 'Preguntafrecuente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Preguntafrecuente, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Preguntafrecuente, {exclude: 'where'}) filter?: FilterExcludingWhere<Preguntafrecuente>
  ): Promise<Preguntafrecuente> {
    return this.preguntafrecuenteRepository.findById(id, filter);
  }

  @patch('/preguntafrecuentes/{id}')
  @response(204, {
    description: 'Preguntafrecuente PATCH success',
  })
  @authenticate('jwt')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preguntafrecuente, {partial: true}),
        },
      },
    })
    preguntafrecuente: Preguntafrecuente,
  ): Promise<void> {
    await this.preguntafrecuenteRepository.updateById(id, preguntafrecuente);
  }

  @put('/preguntafrecuentes/{id}')
  @response(204, {
    description: 'Preguntafrecuente PUT success',
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() preguntafrecuente: Preguntafrecuente,
  ): Promise<void> {
    await this.preguntafrecuenteRepository.replaceById(id, preguntafrecuente);
  }

  @del('/preguntafrecuentes/{id}')
  @response(204, {
    description: 'Preguntafrecuente DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Roles.admin],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.preguntafrecuenteRepository.deleteById(id);
  }
}
