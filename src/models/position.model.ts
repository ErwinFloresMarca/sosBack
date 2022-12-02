import {Entity, model, property} from '@loopback/repository';

@model()
export class Position extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  rastreoId?: number;

  @property({
    type: 'string',
    required:true,
  })
  position: string;

  @property({
    type: 'date',
    mysql: {
      dataType: 'timestamp',
      default: 'CURRENT_TIMESTAMP',//rellena por defecto con la fecha actual de creacion en la basse de datos
    },
    defaultFn: 'now',
    required: false,
  })
  createdAt?: string;


  constructor(data?: Partial<Position>) {
    super(data);
  }
}

export interface PositionRelations {
  // describe navigational properties here
}

export type PositionWithRelations = Position & PositionRelations;
