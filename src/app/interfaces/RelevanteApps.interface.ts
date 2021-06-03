import { ResultadoEjecucionInterface } from './resultadoEjecucion.interface';
export interface RelevanteAppsInterface {
  resultadoEjecucion: ResultadoEjecucionInterface;
  fuerzaComercial: FuerzaComercial;
  prospectos: Prospectos;
  fueraLinea: FueraLinea;
  top5Rechazos: Top5Rechazo[];
}

interface Top5Rechazo {
  orden: number;
  rechazo: string;
}

interface FueraLinea {
  apsUtilizan: number;
  tendenciaUso: boolean;
  tramitesCertificados: number;
}

interface Prospectos {
  apsUtilizan: number;
  tendenciaUso: boolean;
  correosProm: number;
  ofertaValor: number;
  prevalidacion: number;
  certificacion: number;
}

interface FuerzaComercial {
  tramitesGenerados: number;
  tendenciaTG: boolean;
  tramitesFinalizados: number;
  porcentajePrimerIntento: string;
  tramitesNoRecuperados: number;
}
