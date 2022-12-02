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
import {Violencia} from '../models';
import {ViolenciaRepository} from '../repositories';
import Roles from '../utils/roles.util';

export class ViolenciaController {
  constructor(
    @repository(ViolenciaRepository)
    public violenciaRepository : ViolenciaRepository,
  ) {}

  @post('/violencias')
  @response(200, {
    description: 'Violencia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Violencia)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Violencia, {
            title: 'NewViolencia',
            exclude: ['id'],
          }),
        },
      },
    })
    violencia: Omit<Violencia, 'id'>,
  ): Promise<Violencia> {
    return this.violenciaRepository.create(violencia);
  }

  @get('/violencias/count')
  @response(200, {
    description: 'Violencia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Violencia) where?: Where<Violencia>,
  ): Promise<Count> {
    return this.violenciaRepository.count(where);
  }

  @get('/violencias')
  @response(200, {
    description: 'Array of Violencia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Violencia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Violencia) filter?: Filter<Violencia>,
  ): Promise<Violencia[]> {
    return this.violenciaRepository.find(filter);
  }

  @patch('/violencias')
  @response(200, {
    description: 'Violencia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Violencia, {partial: true}),
        },
      },
    })
    violencia: Violencia,
    @param.where(Violencia) where?: Where<Violencia>,
  ): Promise<Count> {
    return this.violenciaRepository.updateAll(violencia, where);
  }

  @get('/violencias/{id}')
  @response(200, {
    description: 'Violencia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Violencia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Violencia, {exclude: 'where'}) filter?: FilterExcludingWhere<Violencia>
  ): Promise<Violencia> {
    return this.violenciaRepository.findById(id, filter);
  }

  @patch('/violencias/{id}')
  @response(204, {
    description: 'Violencia PATCH success',
  })
  @authenticate('jwt')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Violencia, {partial: true}),
        },
      },
    })
    violencia: Violencia,
  ): Promise<void> {
    await this.violenciaRepository.updateById(id, violencia);
  }

  @put('/violencias/{id}')
  @response(204, {
    description: 'Violencia PUT success',
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() violencia: Violencia,
  ): Promise<void> {
    await this.violenciaRepository.replaceById(id, violencia);
  }

  @del('/violencias/{id}')
  @response(204, {
    description: 'Violencia DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Roles.admin],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.violenciaRepository.deleteById(id);
  }
}
