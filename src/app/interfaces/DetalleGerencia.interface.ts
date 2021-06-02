import { ResultadoEjecucionInterface } from './resultadoEjecucion.interface';

export interface DetalleGerenciaInterface {
  resultadoEjecucion: ResultadoEjecucionInterface;
  productivos: string;
  productivoAcivo: boolean;
  saldoPromedio: string;
  saldoPromedioAcivo: boolean;
  fct: string;
  fctAcivo: boolean;
  traspasos: string;
  traspasosAcivo: boolean;
  bienPrimera: string;
  bienPrimeraAcivo: boolean;
  rotacion: string;
  rotacionAcivo: boolean;
}
