import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HeaderGerentesInterface } from '../../interfaces/dto/headerGerentes.interface';
import { GerentesService } from '../../services/gerentes.service';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { stringify } from '@angular/compiler/src/util';

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
  dirPos:number;
  dirArrow:string;
  nacPos:number;
  nacArrow:string;
  pantallaId:number;
  
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

  public loadData(gerencia: ReporteGerencia ): void{
    this.nominaGerente = +gerencia.nominaGerente;
    this.sucursal = gerencia.nombreSuc;
    this.nombre = gerencia.nombre;
    this.foto = gerencia.foto;
    this.apellidos = gerencia.apellido;
    this.loading = true;
    this.service.getHeader(this.nominaGerente.toString())
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

  public getPositionIcon(img:string): string{
    let result:string;

    if(img.length === 0)
      return result;

    if(img.includes('up'))
      result = "fas fa-arrow-up";
    else if(img.includes('down'))
      result = "fas fa-arrow-down";
    else if(img.includes('equal'))
      result = "fas fa-equals";

    return result;
  }

}