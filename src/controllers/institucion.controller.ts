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
import {Institucion} from '../models';
import {InstitucionRepository} from '../repositories';
import Roles from '../utils/roles.util';

export class InstitucionController {
  constructor(
    @repository(InstitucionRepository)
    public institucionRepository : InstitucionRepository,
  ) {}

  @post('/institucions')
  @response(200, {
    description: 'Institucion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Institucion)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Institucion, {
            title: 'NewInstitucion',
            exclude: ['id'],
          }),
        },
      },
    })
    institucion: Omit<Institucion, 'id'>,
  ): Promise<Institucion> {
    return this.institucionRepository.create(institucion);
  }

  @get('/institucions/count')
  @response(200, {
    description: 'Institucion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Roles.admin],
    voters: [basicAuthorization],
  })
  async count(
    @param.where(Institucion) where?: Where<Institucion>,
  ): Promise<Count> {
    return this.institucionRepository.count(where);
  }

  @get('/institucions')
  @response(200, {
    description: 'Array of Institucion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Institucion, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(Institucion) filter?: Filter<Institucion>,
  ): Promise<Institucion[]> {
    return this.institucionRepository.find(filter);
  }

  @patch('/institucions')
  @response(200, {
    description: 'Institucion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Institucion, {partial: true}),
        },
      },
    })
    institucion: Institucion,
    @param.where(Institucion) where?: Where<Institucion>,
  ): Promise<Count> {
    return this.institucionRepository.updateAll(institucion, where);
  }

  @get('/institucions/{id}')
  @response(200, {
    description: 'Institucion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Institucion, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Institucion, {exclude: 'where'}) filter?: FilterExcludingWhere<Institucion>
  ): Promise<Institucion> {
    return this.institucionRepository.findById(id, filter);
  }

  @patch('/institucions/{id}')
  @response(204, {
    description: 'Institucion PATCH success',
  })
  @authenticate('jwt')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Institucion, {partial: true}),
        },
      },
    })
    institucion: Institucion,
  ): Promise<void> {
    await this.institucionRepository.updateById(id, institucion);
  }

  @put('/institucions/{id}')
  @response(204, {
    description: 'Institucion PUT success',
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() institucion: Institucion,
  ): Promise<void> {
    await this.institucionRepository.replaceById(id, institucion);
  }

  @del('/institucions/{id}')
  @response(204, {
    description: 'Institucion DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: [Roles.admin],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.institucionRepository.deleteById(id);
  }
}
