import { ResultadoEjecucionInterface } from '../resultadoEjecucion.interface';
import { EspecialistaGerenteInterface } from '../especialistaGerente.interface';


export interface HeaderGerentesInterface {
    resultadoEjecucion: ResultadoEjecucionInterface;
    pantalla: number;
    aPsMetaAlcanzada: number;
    perfil: string;
    progreso:EspecialistaGerenteInterface;
}