import { ResultadoEjecucionInterface } from '../resultadoEjecucion.interface';
export interface AlertaMensajeInterface {
    resultadoEjecucion:ResultadoEjecucionInterface;
    mensaje:string;
    saldoAcumulado:string;
}