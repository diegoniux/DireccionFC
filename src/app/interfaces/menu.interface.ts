import { OpcionInterface } from './opcion.interface';
export interface MenuInterface {
  idMenu?: number;
  idModulo?: number;
  menu?: string;
  imagen?: any;
  listOpciones?: OpcionInterface[];
}
