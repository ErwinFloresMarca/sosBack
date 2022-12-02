import {Entity, model, property} from '@loopback/repository';

@model()
export class Violencia extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    default:'',
  })
  img?: string;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  ejemplos?: string[];

  @property({
    type: 'array',
    itemType: 'object',
    default: [],
  })
  pasos?: object[];

  @property({
    type: 'array',
    itemType: 'object',
    default: [],
  })
  contactos?: object[];


  constructor(data?: Partial<Violencia>) {
    super(data);
  }
}

export interface ViolenciaRelations {
  // describe navigational properties here
}

export type ViolenciaWithRelations = Violencia & ViolenciaRelations;
