import { ResultadoEjecucionInterface } from './resultadoEjecucion.interface';
export interface ProductividadSemanalInterface{
    resultadoEjecucion: ResultadoEjecucionInterface;
    resultSemanas: ResultSemanas;
    resultDatos: ResultDato[];
    resultTotal: ResultTotal;
    resultSemanasTotal: ResultSemanasTotal;
}

interface ResultSemanasTotal {
    semana1Total: number;
    semana2Total: number;
    semana3Total: number;
    semana4Total: number;
  }
  
  interface ResultTotal {
    saldoVirtualTotal: number;
    anio: number;
    tetrasemanaAnio: number;
    esActual: boolean;
    fechaCorte: string;
    esUltimaFechaCorte: boolean;
  }
  
  interface ResultDato {
    nombreCompletoAP: string;
    saldoVirtualSemana1: string;
    saldoVirtualSemana2: string;
    saldoVirtualSemana3: string;
    saldoVirtualSemana4: string;
    indicadorSaldoMetaSem1: string;
    indicadorSaldoMetaSem2: string;
    indicadorSaldoMetaSem3: string;
    indicadorSaldoMetaSem4: string;
    saldoVirtualTetrasemana: number;
    indicadorSaldoMetaTetra: string;
  }
  
  interface ResultSemanas {
    semana1: string;
    semana2: string;
    semana3: string;
    semana4: string;
  }