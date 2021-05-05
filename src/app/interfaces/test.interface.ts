import { ResultadoEjecucionInterface } from './resultadoEjecucion.interface';

export interface TestInterface {
  resultadoEjecucion: ResultadoEjecucionInterface;
  barraAvanceMetas: BarraAvanceMetas;
  popUpSV: PopUpSV;
  popUpTraspasos: PopUpTraspasos;
  popUpFCT: PopUpFCT;
  mensaje: string;
}

interface PopUpFCT {
  fctActivos: string;
  fctInactivos: string;
  fctCancelados: string;
}

interface PopUpTraspasos {
  registros: number;
  traspasos: number;
  traspasosFCT: number;
  total: number;
  mensajeSaldoR: string;
  registrosMenores: number;
  mensajeSaldoT: string;
  traspasosMenores: number;
}

interface PopUpSV {
  saldoVirtual: string;
  saldoCantado: string;
  saldoAcumulado: string;
}

interface BarraAvanceMetas {
  saldoVirtual: string;
  objetivoSV: string;
  proyeccion: string;
  saldoVirtualBar: string;
  solicitudes: string;
  objetivoSol: string;
  solicitudesBar: string;
  traspasosFCT: string;
  objetivoTra: string;
  traspasosBar: string;
  gerenciasProductivas: string;
  objetivoGP: string;
  gerenciasBar: string;
}
