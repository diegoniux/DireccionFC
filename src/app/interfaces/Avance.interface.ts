import { ResultadoEjecucionInterface } from './resultadoEjecucion.interface';
export interface AvanceInterface {
  resultadoEjecucion: ResultadoEjecucionInterface;
  productivos: string;
  productivoAcivo: boolean;
  porcentajeProd: string;
  tendenciaProdOK: boolean;
  saldoPromedio: string;
  saldoPromedioAcivo: boolean;
  porcentajeSP: string;
  tendenciaSaldoPromOK: boolean;
  fct: string;
  fctAcivo: boolean;
  porcentajeFCT: string;
  tendenciaFCTOK: boolean;
  traspasos: string;
  traspasosAcivo: boolean;
  porcentajeT: string;
  tendenciaTraspOK: boolean;
  bienPrimera: string;
  bienPrimeraAcivo: boolean;
  porcentajeB1: string;
  tendenciaB1OK: boolean;
  rotacion: string;
  rotacionAcivo: boolean;
  porcentajeR: string;
  tendenciaRotOK: boolean;
  detalleSaldoSemanal: DetalleSaldoSemanal;
  detalleSaldoMensual: DetalleSaldoMensual;
}

interface DetalleSaldoMensual {
  saldo: string;
  sem1: string;
  sem2: string;
  sem3: string;
  sem4: string;
}

interface DetalleSaldoSemanal {
  saldo?: any;
  lunes?: any;
  martes?: any;
  miercoles?: any;
  jueves?: any;
  viernes?: any;
  sabado?: any;
  domingo?: any;
}
