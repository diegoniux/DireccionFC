import { UserInfoInterface } from '../userInfo.interface';
import { ResultadoEjecucionInterface } from '../resultadoEjecucion.interface';

export interface plantillaDirectorComercialInterface{
    resultadoEjecucion:ResultadoEjecucionInterface;
    listaPlantilla:UserInfoInterface[];
}