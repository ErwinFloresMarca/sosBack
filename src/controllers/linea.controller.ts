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
import {Linea} from '../models';
import {LineaRepository} from '../repositories';
import Roles from '../utils/roles.util';

export class LineaController {
  constructor(
    @repository(LineaRepository)
    public lineaRepository : LineaRepository,
  ) {}

  @post('/lineas')
  @response(200, {
    description: 'Linea model instance',
    content: {'application/json': {schema: getModelSchemaRef(Linea)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Linea, {
            title: 'NewLinea',
            exclude: ['id'],
          }),
        },
      },
    })
    linea: Omit<Linea, 'id'>,
  ): Promise<Linea> {
    return this.lineaRepository.create(linea);
  }

  @get('/lineas/count')
  @response(200, {
    description: 'Linea model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Linea) where?: Where<Linea>,
  ): Promise<Count> {
    return this.lineaRepository.count(where);
  }

  @get('/lineas')
  @response(200, {
    description: 'Array of Linea model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Linea, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Linea) filter?: Filter<Linea>,
  ): Promise<Linea[]> {
    return this.lineaRepository.find(filter);
  }

  @patch('/lineas')
  @response(200, {
    description: 'Linea PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Linea, {partial: true}),
        },
      },
    })
    linea: Linea,
    @param.where(Linea) where?: Where<Linea>,
  ): Promise<Count> {
    return this.lineaRepository.updateAll(linea, where);
  }

  @get('/lineas/{id}')
  @response(200, {
    description: 'Linea model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Linea, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Linea, {exclude: 'where'}) filter?: FilterExcludingWhere<Linea>
  ): Promise<Linea> {
    return this.lineaRepository.findById(id, filter);
  }

  @patch('/lineas/{id}')
  @response(204, {
    description: 'Linea PATCH success',
  })
  @authenticate('jwt')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Linea, {partial: true}),
        },
      },
    })
    linea: Linea,
  ): Promise<void> {
    await this.lineaRepository.updateById(id, linea);
  }

  @put('/lineas/{id}')
  @response(204, {
    description: 'Linea PUT success',
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() linea: Linea,
  ): Promise<void> {
    await this.lineaRepository.replaceById(id, linea);
  }

  @del('/lineas/{id}')
  @response(204, {
    description: 'Linea DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Roles.admin],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lineaRepository.deleteById(id);
  }
}
