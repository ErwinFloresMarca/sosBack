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
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { basicAuthorization } from '../middlewares/auth.midd';
import {Rastreo} from '../models';
import {RastreoRepository} from '../repositories';
import Roles from '../utils/roles.util';

export class RastreoController {
  constructor(
    @repository(RastreoRepository)
    public rastreoRepository: RastreoRepository,
  ) {}

  @post('/rastreos')
  @response(200, {
    description: 'Rastreo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rastreo)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rastreo, {
            title: 'NewRastreo',
            exclude: ['id'],
          }),
        },
      },
    })
    rastreo: Omit<Rastreo, 'id'>,
  ): Promise<Rastreo> {
    return this.rastreoRepository.create({
      ... rastreo,
      createdAt: (new Date()).toISOString(),
    });
  }

  @get('/rastreos/count')
  @response(200, {
    description: 'Rastreo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  async count(@param.where(Rastreo) where?: Where<Rastreo>): Promise<Count> {
    return this.rastreoRepository.count(where);
  }

  @get('/rastreos')
  @response(200, {
    description: 'Array of Rastreo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rastreo, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(Rastreo) filter?: Filter<Rastreo>,
  ): Promise<Rastreo[]> {
    return this.rastreoRepository.find(filter);
  }

  @get('/rastreos/{id}')
  @response(200, {
    description: 'Rastreo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rastreo, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Rastreo, {exclude: 'where'})
    filter?: FilterExcludingWhere<Rastreo>,
  ): Promise<Rastreo> {
    return this.rastreoRepository.findById(id, filter);
  }

  @patch('/rastreos/{id}')
  @response(204, {
    description: 'Rastreo PATCH success',
  })
  @authenticate('jwt')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rastreo, {partial: true}),
        },
      },
    })
    rastreo: Rastreo,
  ): Promise<void> {
    await this.rastreoRepository.updateById(id, {
      ...rastreo,
      updatedAt: (new Date()).toISOString(),
    });
  }

  @del('/rastreos/{id}')
  @response(204, {
    description: 'Rastreo DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Roles.admin],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rastreoRepository.deleteById(id);
  }
}
