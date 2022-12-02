import {Entity, model, property} from '@loopback/repository';

@model()
export class Institucion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    mysql: {
      dataType: 'longtext',//tipo de dato de almacenamiento mas amplio de la base de datos
    },
  })
  posicionGegrafica?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: false,
    default:'',
  })
  servicio: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    default:'',
  })
  telefono?: string;


  constructor(data?: Partial<Institucion>) {
    super(data);
  }
}

export interface InstitucionRelations {
  // describe navigational properties here
}

export type InstitucionWithRelations = Institucion & InstitucionRelations;
