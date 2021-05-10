import { ResultadoEjecucionInterface } from '../resultadoEjecucion.interface';
import { MejorSaldoInterface } from '../mejorSaldo.interface';


export interface MejoresSaldosInterface {
  resultadoEjecucion: ResultadoEjecucionInterface;
  encabezadoPeriodo: string;
  listaMejorSaldo: MejorSaldoInterface[];
}

