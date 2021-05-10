import { ResultadoEjecucionInterface } from '../resultadoEjecucion.interface';
import { TendenciaInterface } from '../tendencia.interface';


export interface TendenciasInterface {
  resultadoEjecucion: ResultadoEjecucionInterface;
  encabezadoPeriodo: string;
  listaTendencias: TendenciaInterface[];
}

