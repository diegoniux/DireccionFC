import { RankSemanalInterface } from './rankSemanal.interface';

export interface GerenteRankingInterface {
    nombre:string;
    apellidos:string;
    foto:string;
    posicion:string;
    saldo:string;
    tipoSaldo:string;
    numTraspaso:number;
    imgPosicionSemAnt:string;
    colorPosicion:string;
    colorTextoSaldo:string;
    estrellas:RankSemanalInterface;
}