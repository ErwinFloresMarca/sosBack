import {hasOne, model, property, hasMany} from '@loopback/repository';
import {TimeStamp} from './time-stamp.model';
import {UsuarioCredentials} from './usuario-credentials.model';
import {Rastreo, RastreoWithRelations} from './rastreo.model';
import {Parentesco} from './parentesco.model';

@model()
export class Usuario extends TimeStamp {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    nullable: true,
  })
  paterno: string;

  @property({
    type: 'string',
    required: true,
  })
  materno: string;

  @property({
    type: 'string',
    required: false,
    nullable: true,
  })
  ci: string;

  @property({
    type: 'string',
    nullable: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
  })
  usuario: string;

  @property({
    type: 'string',
    nullable: true,
  })
  email: string;

  @property({
    type: 'string',
    nullable: true,
  })
  avatar?: string;

  @property({
    type: 'string',
  })
  rol: string;

  @property({
    type: Boolean,
  })
  rastreoEnLinea: boolean;

  @property({
    type: Date,
  })
  fechaNacimiento: Date;

  @hasOne(() => UsuarioCredentials)
  usuarioCredentials: UsuarioCredentials;

  @hasMany(() => Rastreo)
  rastreos: Rastreo[];

  @hasMany(() => Parentesco)
  parentescos: Parentesco[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  rastreos?: RastreoWithRelations[];
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
