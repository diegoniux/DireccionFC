import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MejorSaldoInterface } from 'src/app/interfaces/mejorSaldo.interface';
import { DetalleGerenciasService } from '../../services/detalle-gerencias-service.service';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';

@Component({
  selector: 'app-mejor-saldo',
  templateUrl: './mejor-saldo.component.html',
  styleUrls: ['./mejor-saldo.component.css']
})
export class MejorSaldoComponent implements OnInit {
  nomina: number;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  mejorSaldo: MejorSaldoInterface;
  periodo: number;

  constructor(public detalleGerenciasService: DetalleGerenciasService) { 
    this.periodo = 0;
  }

  ngOnInit(): void {
  }

  public getMejorSaldo(): any
  {
    this.detalleGerenciasService.getMejorSaldo(this.nomina, this.idTipoPeriodo, this.periodoSemana.fechaInicial
      , this.periodoSemana.fechaFinal, this.periodo)
    .toPromise()
    .then((data: MejorSaldoInterface) => {
      this.mejorSaldo = data;
      console.log(this.mejorSaldo);
    })
    .catch(error => {
      console.error(error)
    });
  }
  public cargarPeriodo(periodosPrevios: number): any
  {
    this.periodo = this.periodo + periodosPrevios;
    if(this.periodo > 0)
    {
      this.periodo = 0;
      return;
    }
    this.getMejorSaldo();

    return;
  }

}
