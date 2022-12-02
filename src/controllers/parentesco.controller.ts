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
import {Parentesco} from '../models';
import {ParentescoRepository} from '../repositories';
import Roles from '../utils/roles.util';

export class ParentescoController {
  constructor(
    @repository(ParentescoRepository)
    public parentescoRepository : ParentescoRepository,
  ) {}

  @post('/parentescos')
  @response(200, {
    description: 'Parentesco model instance',
    content: {'application/json': {schema: getModelSchemaRef(Parentesco)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parentesco, {
            title: 'NewParentesco',
            exclude: ['id'],
          }),
        },
      },
    })
    parentesco: Omit<Parentesco, 'id'>,
  ): Promise<Parentesco> {
    return this.parentescoRepository.create(parentesco);
  }

  @get('/parentescos/count')
  @response(200, {
    description: 'Parentesco model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  async count(
    @param.where(Parentesco) where?: Where<Parentesco>,
  ): Promise<Count> {
    return this.parentescoRepository.count(where);
  }

  @get('/parentescos')
  @response(200, {
    description: 'Array of Parentesco model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Parentesco, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(Parentesco) filter?: Filter<Parentesco>,
  ): Promise<Parentesco[]> {
    return this.parentescoRepository.find(filter);
  }

  @patch('/parentescos')
  @response(200, {
    description: 'Parentesco PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parentesco, {partial: true}),
        },
      },
    })
    parentesco: Parentesco,
    @param.where(Parentesco) where?: Where<Parentesco>,
  ): Promise<Count> {
    return this.parentescoRepository.updateAll(parentesco, where);
  }

  @get('/parentescos/{id}')
  @response(200, {
    description: 'Parentesco model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Parentesco, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Parentesco, {exclude: 'where'}) filter?: FilterExcludingWhere<Parentesco>
  ): Promise<Parentesco> {
    return this.parentescoRepository.findById(id, filter);
  }

  @patch('/parentescos/{id}')
  @response(204, {
    description: 'Parentesco PATCH success',
  })
  @authenticate('jwt')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parentesco, {partial: true}),
        },
      },
    })
    parentesco: Parentesco,
  ): Promise<void> {
    await this.parentescoRepository.updateById(id, parentesco);
  }

  @put('/parentescos/{id}')
  @response(204, {
    description: 'Parentesco PUT success',
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parentesco: Parentesco,
  ): Promise<void> {
    await this.parentescoRepository.replaceById(id, parentesco);
  }

  @del('/parentescos/{id}')
  @response(204, {
    description: 'Parentesco DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Roles.admin,Roles.user],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parentescoRepository.deleteById(id);
  }
}
