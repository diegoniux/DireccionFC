import { PeriodoMesInterface } from '../PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../periodoSemana.interface';
import { ResultadoEjecucionInterface } from '../resultadoEjecucion.interface';

export interface FechasPeriodoInterface {
  resultadoEjecucion: ResultadoEjecucionInterface;
  periodoSemana: PeriodoSemanaInterface;
  periodoMes: PeriodoMesInterface;
}

