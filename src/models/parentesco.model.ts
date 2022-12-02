import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario, UsuarioWithRelations} from './usuario.model';

@model()
export class Parentesco extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  /*@property({
    type: 'number',
  })
  userId?: number;*/
  @property({
    type: 'string',
    required: true,
  })
  parentType: string;

  @belongsTo(() => Usuario)
  usuarioId: number;
  @belongsTo(() => Usuario)
  parentId: number;

  constructor(data?: Partial<Parentesco>) {
    super(data);
  }
}

export interface ParentescoRelations {
  parent?: UsuarioWithRelations,
  usuario?: UsuarioWithRelations
  // describe navigational properties here
}

export type ParentescoWithRelations = Parentesco & ParentescoRelations;
