import { ResultadoEjecucionInterface } from './resultadoEjecucion.interface';

export interface ReporteGerenciasInterface {
    resultadoEjecucion: ResultadoEjecucionInterface;
    reporteGerencias: ReporteGerencia[];
  }

interface ReporteGerencia {
  nominaGerente: string;
  usuarioIdGerente: string;
  sucursalCve: string;
  foto: string;
  nombre: string;
  apellido: string;
  nombreSuc: string;
  proyeccion: string;
  proyeccionColor: string;
  saldoAcomulado: string;
  saldoVirtual: string;
  saldoCantado: string;
  saldoPromedio: string;
  productividadEsp: string;
  productividadEsps: ProductividadEsp[];
  mejorSaldo: string;
  periodo: string;
  imgFlecha: boolean;
  desempeno: string;
  diagnostico: string;
}
interface ProductividadEsp {
  rangos: string;
  especialistas: number;
  color: string;
}