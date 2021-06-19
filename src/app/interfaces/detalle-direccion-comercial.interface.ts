import { ResultadoEjecucionInterface } from "./resultadoEjecucion.interface";

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
    saldoAcumulado: string;
    gerenciasProductivas: string;
    solicitudes: string;
    traspasosFCT: string;
    especialistasEnRiesgo: string;
    desempeno: string;
    desempenoActivo: boolean;
  }

  