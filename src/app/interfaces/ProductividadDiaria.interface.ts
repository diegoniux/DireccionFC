import { ResultadoEjecucionInterface } from './resultadoEjecucion.interface';
export interface ProductividadDiariaInterface {
    resultadoEjecucion: ResultadoEjecucionInterface;
    resultFechas: ResultFechas;
    resultDatos: ResultDato[];
    resultAnioSemana: ResultAnioSemana;
  }
  
  interface ResultAnioSemana {
    anio: number;
    semanaAnio: number;
    esActual: boolean;
    fechaCorte: string;
    esUltimaFechaCorte: boolean;
    totalSaldoVirtualLunes: number;
    totalSaldoVirtualMartes: number;
    totalSaldoVirtualMiercoles: number;
    totalSaldoVirtualJueves: number;
    totalSaldoVirtualViernes: number;
    totalSaldoVirtualSabado: number;
    totalSaldoVirtualDomingo: number;
    totalSaldoVirtualSemana: number;
    totalSaldoVirtualFaltante: number;
    totalMetaSemana: number;
    totalFCTInactivos: number;
    totalFCTActivos: number;
    totalFoliosMenores30k: number;
    totalFoliosCertificados: number;
  }
  
  interface ResultDato {
    nombreCompletoAP: string;
    saldoVirtualLunes: string;
    saldoVirtualMartes: string;
    saldoVirtualMiercoles: string;
    saldoVirtualJueves: string;
    saldoVirtualViernes: string;
    saldoVirtualSabado: string;
    saldoVirtualDomingo: string;
    saldoVirtualSemana: number;
    indicadorSaldoMeta: string;
    saldoVirtualFaltante: number;
    metaSemana: number;
    fctInactivos: number;
    fctActivos: number;
    foliosMenores30k: number;
    foliosCertificados: number;
  }
  
  interface ResultFechas {
    fechaLunes: string;
    fechaMartes: string;
    fechaMiercoles: string;
    fechaJueves: string;
    fechaViernes: string;
    fechaSabado: string;
    fechaDomingo: string;
  }