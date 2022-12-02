import {model, property, hasMany, belongsTo} from '@loopback/repository';
import {TimeStamp} from './index';
import {Position, PositionWithRelations} from './position.model';
import {Usuario, UsuarioWithRelations} from './usuario.model';

@model()
export class Rastreo extends TimeStamp {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @hasMany(() => Position)
  positions: Position[];

  @belongsTo(() => Usuario)
  usuarioId: number;

  constructor(data?: Partial<Rastreo>) {
    super(data);
  }
}

export interface RastreoRelations {
  positions?: PositionWithRelations,
  usuario?: UsuarioWithRelations,
  // describe navigational properties here
}

export type RastreoWithRelations = Rastreo & RastreoRelations;
