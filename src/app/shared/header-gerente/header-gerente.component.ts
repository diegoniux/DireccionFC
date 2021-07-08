import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HeaderGerentesInterface } from '../../interfaces/dto/headerGerentes.interface';
import { GerentesService } from '../../services/gerentes.service';

@Component({
  selector: 'app-header-gerente',
  templateUrl: './header-gerente.component.html',
  styleUrls: ['./header-gerente.component.css']
})
export class HeaderGerenteComponent implements OnInit {
  @Output() isLoadingEvent = new EventEmitter<boolean>();
  nombre: string;
  apellidos: string;
  sucursal: string;
  headerData: HeaderGerentesInterface;
  saldoVirtual: string;
  saldoCantado: string;
  saldoAcumulado: string;
  loading: boolean;

  constructor(public service: GerentesService) { 
    this.saldoAcumulado = '$0M';
    this.saldoVirtual = '$0M';
    this.saldoCantado = '$0M';
  }

  ngOnInit(): void {
    this.loadData(26720, 'popo')
  }

  public loadData(nomina: number, suc: string): void{
    console.log('la NOMINa ES: ' + nomina);
    this.sucursal = suc;
    this.loading = true;
    this.service.getHeader(nomina.toString())
    .toPromise()
    .then((data: HeaderGerentesInterface) => {
      if(!data.resultadoEjecucion.ejecucionCorrecta)
      {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.saldoAcumulado = data.progreso.saldoAcumulado;
      this.saldoCantado = data.progreso.saldoCantadoFCT;
      this.saldoVirtual = data.progreso.saldoVirtual;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }

}
