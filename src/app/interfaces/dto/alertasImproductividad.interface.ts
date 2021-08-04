import { ResultadoEjecucionInterface } from '../resultadoEjecucion.interface';

export interface AlertasImproductividadInterface {
    resultadoEjecucion:ResultadoEjecucionInterface;
    cantidad:number;
    resultDatos:AlertasImproductividadInterface[];
}