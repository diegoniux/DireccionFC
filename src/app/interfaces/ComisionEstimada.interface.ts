import { ResultadoEjecucionInterface } from './resultadoEjecucion.interface';

export interface ComisionEstimadaInterface {
  resultadoEjecucion: ResultadoEjecucionInterface;
  periodo: string;
  saldoProyeccion: string;
  comisionSP: string;
  bonoExcelenciaSP: string;
  bonoDesarrolloSP: string;
  colorSaldoProyeccion: string;
  saldoObjetivoGerente: string;
  comisionOG: string;
  bonoExcelenciaOG: string;
  bonoDesarrolloOG: string;
  mejorSaldo: string;
  comisionMS: string;
  bonoExcelenciaMS: string;
  bonoDesarrolloMS: string;
}
