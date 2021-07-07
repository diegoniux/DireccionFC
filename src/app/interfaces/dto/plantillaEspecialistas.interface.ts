import { EspecialistaInterface } from '../especialista.interface';
import { ResultadoEjecucionInterface } from '../resultadoEjecucion.interface';

export interface PlantillaEspecialistasInterface {
  resultadoEjecucion?: ResultadoEjecucionInterface;
  promotores?: EspecialistaInterface[];
}