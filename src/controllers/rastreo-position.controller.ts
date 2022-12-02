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
  Rastreo,
  Position,
} from '../models';
import {RastreoRepository} from '../repositories';
import Roles from '../utils/roles.util';

export class RastreoPositionController {
  constructor(
    @repository(RastreoRepository) protected rastreoRepository: RastreoRepository,
  ) { }

  @get('/rastreos/{id}/positions', {
    responses: {
      '200': {
        description: 'Array of Rastreo has many Position',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Position)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Position>,
  ): Promise<Position[]> {
    return this.rastreoRepository.positions(id).find(filter);
  }

  @post('/rastreos/{id}/positions', {
    responses: {
      '200': {
        description: 'Rastreo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Position)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @param.path.number('id') id: typeof Rastreo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Position, {
            title: 'NewPositionInRastreo',
            exclude: ['id'],
            optional: ['rastreoId']
          }),
        },
      },
    }) position: Omit<Position, 'id'>,
  ): Promise<Position> {
    return this.rastreoRepository.positions(id).create(position);
  }

  @patch('/rastreos/{id}/positions', {
    responses: {
      '200': {
        description: 'Rastreo.Position PATCH success count',
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
          schema: getModelSchemaRef(Position, {partial: true}),
        },
      },
    })
    position: Partial<Position>,
    @param.query.object('where', getWhereSchemaFor(Position)) where?: Where<Position>,
  ): Promise<Count> {
    return this.rastreoRepository.positions(id).patch(position, where);
  }

  @del('/rastreos/{id}/positions', {
    responses: {
      '200': {
        description: 'Rastreo.Position DELETE success count',
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
    @param.query.object('where', getWhereSchemaFor(Position)) where?: Where<Position>,
  ): Promise<Count> {
    return this.rastreoRepository.positions(id).delete(where);
  }
}
