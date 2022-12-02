import {Entity, model, property} from '@loopback/repository';

@model()
export class Linea extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  tipo?: string;

  @property({
    type: 'number',
  })
  imgId?: number;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'string',
    required: true,
  })
  numero: string;

  @property({
    type: 'string',
  })
  descripcion?: string;


  constructor(data?: Partial<Linea>) {
    super(data);
  }
}

export interface LineaRelations {
  // describe navigational properties here
}

export type LineaWithRelations = Linea & LineaRelations;
