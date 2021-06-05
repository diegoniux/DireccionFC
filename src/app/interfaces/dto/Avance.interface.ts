import { ResultadoEjecucionInterface } from '../resultadoEjecucion.interface';
import { SaldoAvanceInterface } from '../saldoAvance.interface';

export interface AvanceInterface {
  resultadoEjecucion: ResultadoEjecucionInterface;
  saldoVirtual: string;
  saldoCantado: string;
  saldoAcumulado: string;
  comisionEstimada: string;
  listaSaldoAvances: SaldoAvanceInterface[];
}