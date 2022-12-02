import {Entity, model, property} from '@loopback/repository';

@model()
export class Preguntafrecuente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    default:1,
  })
  mencion?: number;

  @property({
    type: 'string',
    required: true,
  })
  pregunta: string;

  @property({
    type: 'string',
  })
  respuesta?: string;


  constructor(data?: Partial<Preguntafrecuente>) {
    super(data);
  }
}

export interface PreguntafrecuenteRelations {
  // describe navigational properties here
}

export type PreguntafrecuenteWithRelations = Preguntafrecuente & PreguntafrecuenteRelations;
