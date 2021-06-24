import { ResultadoEjecucionInterface } from './resultadoEjecucion.interface';
export interface DetalleDireccionComercial {
  resultadoEjecucion: ResultadoEjecucionInterface;
  detalleDireccionComercial: DetalleDireccionComercialList[];
}
interface DetalleDireccionComercialList {
  foto: string;
  nombre: string;
  apellido: string;
  sucursal: string;
  proyeccion: string;
  proyeccionActivo: boolean;
  saldoAcumulado: string;
  saldoAcumuladoActivo: boolean;
  gerenciasProductivas: string;
  gerenciasProductivasActivo: boolean;
  solicitudes: string;
  solicitudesActivo: boolean;
  traspasosFCT: string;
  traspasosFCTActivo: boolean;
  especialistasEnRiesgo: string;
  especialistasEnRiesgoActivo: boolean;
  desempeno: string;
  desempenoActivo: boolean;
}
