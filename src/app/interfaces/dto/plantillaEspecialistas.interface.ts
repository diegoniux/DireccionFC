import { EspecialistaGerenteInterface } from '../especialistaGerente.interface';
import { ResultadoEjecucionInterface } from '../resultadoEjecucion.interface';

export interface PlantillaEspecialistasInterface {
  resultadoEjecucion?: ResultadoEjecucionInterface;
  promotores?: EspecialistaGerenteInterface[];
}