import { ResultadoEjecucionInterface } from "./resultadoEjecucion.interface";

export interface HeaderDirectorComercial {
    resultadoEjecucion: ResultadoEjecucionInterface;
    foto: string;
    nombre: string;
    apellido: string;
    saldoAcumulado: string;
    saldoVirtual: string;
    saldoCantado: string;
    desempenoVenta: string;
    desempenoVentaActivo: boolean;
  }

