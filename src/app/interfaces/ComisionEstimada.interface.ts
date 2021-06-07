import { ResultadoEjecucionInterface } from "./resultadoEjecucion.interface";
export interface ComisionEstimadaInterface {
  resultadoEjecucion: ResultadoEjecucionInterface;
  periodo: string;
  saldoAcumulado: string;
  bonoExcelenciaSA: string;
  bonoDesarrolloSA: string;
  saldoProyectado: string;
  bonoExcelenciaSP: string;
  bonoDesarrolloSP: string;
  saldoObjetivo: string;
  bonoExcelenciaSO: string;
  bonoDesarrolloSO: string;
  mejorSaldo: string;
  bonoExcelenciaMS: string;
  bonoDesarrolloMS: string;
}
