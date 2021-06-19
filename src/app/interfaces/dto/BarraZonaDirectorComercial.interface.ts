import { ResultadoEjecucionInterface } from '../resultadoEjecucion.interface';

export interface BarraZonaDirectorComercialInterface {
    resultadoEjecucion: ResultadoEjecucionInterface;
    numGerenciasComerciales: number;
    numEspecialistas: number;
    proyeccionSaldo: string;
    mejorSaldo: string;
}