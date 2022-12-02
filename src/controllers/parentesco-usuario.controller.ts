import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Parentesco,
  Usuario,
} from '../models';
import {ParentescoRepository} from '../repositories';

export class ParentescoUsuarioController {
  constructor(
    @repository(ParentescoRepository)
    public parentescoRepository: ParentescoRepository,
  ) { }

  @get('/parentescos/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Parentesco',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof Parentesco.prototype.id,
  ): Promise<Usuario> {
    return this.parentescoRepository.usuario(id);
  }
}
