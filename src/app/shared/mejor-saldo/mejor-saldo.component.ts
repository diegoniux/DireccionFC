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
  constructor(public detalleGerenciasService: DetalleGerenciasService) { 
    this.getMejorSaldo();
  }

  ngOnInit(): void {
  }

  private getMejorSaldo(): any
  {
    this.detalleGerenciasService.getMejorSaldo()
    .toPromise()
    .then((data: MejorSaldoInterface) => {
      this.mejorSaldo = data;
      console.log(this.mejorSaldo);
    })
    .catch(error => {
      console.error(error)
    });
  }

}
