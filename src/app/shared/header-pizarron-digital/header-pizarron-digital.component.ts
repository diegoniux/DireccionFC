import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HeaderGerentesInterface } from '../../interfaces/dto/headerGerentes.interface';
import { GerentesService } from '../../services/gerentes.service';

@Component({
  selector: 'app-header-pizarron-digital',
  templateUrl: './header-pizarron-digital.component.html',
  styleUrls: ['./header-pizarron-digital.component.css']
})
export class HeaderPizarronDigitalComponent implements OnInit {

  @Output() isLoadingEvent = new EventEmitter<boolean>();
  nominaGerente: number;
  nombre: string;
  apellidos: string;
  foto: string;
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
    // this.loadData(this.nominaGerente, '')
    this.nombre = '';
    this.apellidos = ''
    this.foto = 'assets/img/capi_circulo.png'
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
      this.nombre = data.progreso.nombre;
      this.foto = data.progreso.foto;
      this.sucursal = data.perfil;
      this.apellidos = data.progreso.apellidos;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }

}