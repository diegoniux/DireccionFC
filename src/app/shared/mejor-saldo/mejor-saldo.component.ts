import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MejorSaldoInterface } from 'src/app/interfaces/mejorSaldo.interface';
import { DetalleGerenciasService } from '../../services/detalle-gerencias-service.service';

@Component({
  selector: 'app-mejor-saldo',
  templateUrl: './mejor-saldo.component.html',
  styleUrls: ['./mejor-saldo.component.css']
})
export class MejorSaldoComponent implements OnInit {

  mejorSaldo: MejorSaldoInterface;
  periodo: number;
  constructor(public detalleGerenciasService: DetalleGerenciasService) { 
    this.periodo = 0;
    this.getMejorSaldo(17608, 1, "2021-05-03T00:00:00", "2021-05-09T00:00:00", this.periodo);
  }

  ngOnInit(): void {
  }

  private getMejorSaldo(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string, periodosPrevios: number): any
  {
    // nomina = 17608;
    // tipoPeriodo = 1;
    // fechaInicio = "2021-05-03T00:00:00";
    // fechaFin = "2021-05-09T00:00:00";

    this.detalleGerenciasService.getMejorSaldo(nomina, tipoPeriodo, fechaInicio, fechaFin, periodosPrevios)
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
    this.getMejorSaldo(17608, 1, "2021-05-03T00:00:00", "2021-05-09T00:00:00", this.periodo);

    return;
  }

}
