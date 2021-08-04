import { GerenteRankingInterface } from '../gerenteRanking.interface';
import { ResultadoEjecucionInterface } from '../resultadoEjecucion.interface';
export interface RankingInterface {
    resultadoEjecucion:ResultadoEjecucionInterface
    topGerentes:GerenteRankingInterface[];
    gerentes:GerenteRankingInterface[];
    posicionDireccion:number;
    imgPosicionSemAntDireccion:string;
    posicionNacional:number;
    imgPosicionSemAntNacional:string;
}