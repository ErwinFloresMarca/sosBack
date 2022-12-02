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
import {Position} from '../models';
import {PositionRepository} from '../repositories';
import Roles from '../utils/roles.util';

export class PositionController {
  constructor(
    @repository(PositionRepository)
    public positionRepository : PositionRepository,
  ) {}

  @post('/positions')
  @response(200, {
    description: 'Position model instance',
    content: {'application/json': {schema: getModelSchemaRef(Position)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Position, {
            title: 'NewPosition',
            exclude: ['id'],
          }),
        },
      },
    })
    position: Omit<Position, 'id'>,
  ): Promise<Position> {
    return this.positionRepository.create(position);
  }

  @get('/positions/count')
  @response(200, {
    description: 'Position model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  async count(
    @param.where(Position) where?: Where<Position>,
  ): Promise<Count> {
    return this.positionRepository.count(where);
  }

  @get('/positions')
  @response(200, {
    description: 'Array of Position model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Position, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(Position) filter?: Filter<Position>,
  ): Promise<Position[]> {
    return this.positionRepository.find(filter);
  }

  @patch('/positions')
  @response(200, {
    description: 'Position PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Position, {partial: true}),
        },
      },
    })
    position: Position,
    @param.where(Position) where?: Where<Position>,
  ): Promise<Count> {
    return this.positionRepository.updateAll(position, where);
  }

  @get('/positions/{id}')
  @response(200, {
    description: 'Position model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Position, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Position, {exclude: 'where'}) filter?: FilterExcludingWhere<Position>
  ): Promise<Position> {
    return this.positionRepository.findById(id, filter);
  }

  @patch('/positions/{id}')
  @response(204, {
    description: 'Position PATCH success',
  })
  @authenticate('jwt')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Position, {partial: true}),
        },
      },
    })
    position: Position,
  ): Promise<void> {
    await this.positionRepository.updateById(id, position);
  }

  @put('/positions/{id}')
  @response(204, {
    description: 'Position PUT success',
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() position: Position,
  ): Promise<void> {
    await this.positionRepository.replaceById(id, position);
  }

  @del('/positions/{id}')
  @response(204, {
    description: 'Position DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Roles.admin],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.positionRepository.deleteById(id);
  }
}
