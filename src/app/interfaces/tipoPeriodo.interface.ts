import { ResultadoEjecucionInterface } from './resultadoEjecucion.interface';

interface RootObject {
  resultadoEjecucion: ResultadoEjecucionInterface;
  listTiposPetiodo: TipoPeriodo[];
}

interface TipoPeriodo {
  idTipoPeriodo: number;
  tipoPeriodo: string;
}
