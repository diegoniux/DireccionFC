import { Component, OnInit } from '@angular/core';
import { ProductividadDiariaInterface } from '../../interfaces/ProductividadDiaria.interface';
import { ProductividadSemanalInterface } from '../../interfaces/ProductividadSemanal.interface';
import { GerentesService } from '../../services/gerentes.service';

@Component({
  selector: 'app-detalle-productividad',
  templateUrl: './detalle-productividad.component.html',
  styleUrls: ['./detalle-productividad.component.css']
})
export class DetalleProductividadComponent implements OnInit {
  
  productividadDiaria: ProductividadDiariaInterface;
  ProductividadSemanal: ProductividadSemanalInterface;

  constructor(public service: GerentesService) { 

    this.productividadDiaria = {
      resultadoEjecucion: {
        ejecucionCorrecta: true,
        errorMessage: '',
        friendlyMessage: ''
      },
      resultFechas: {
        fechaLunes: '',
        fechaMartes: '',
        fechaMiercoles: '',
        fechaJueves: '',
        fechaViernes: '',
        fechaSabado: '',
        fechaDomingo: ''
      },
      resultDatos: [],
      resultAnioSemana: {
        anio: 0,
        semanaAnio: 0,
        esActual: false,
        fechaCorte: '',
        esUltimaFechaCorte: true,
        totalSaldoVirtualLunes: 0,
        totalSaldoVirtualMartes: 0,
        totalSaldoVirtualMiercoles: 0,
        totalSaldoVirtualJueves: 0,
        totalSaldoVirtualViernes: 0,
        totalSaldoVirtualSabado: 0,
        totalSaldoVirtualDomingo: 0,
        totalSaldoVirtualSemana: 0,
        totalSaldoVirtualFaltante: 0,
        totalMetaSemana: 0,
        totalFCTInactivos: 0,
        totalFCTActivos: 0,
        totalFoliosMenores30k: 0,
        totalFoliosCertificados: 0
      }
    }

    this.ProductividadSemanal = {
      resultadoEjecucion: {
        ejecucionCorrecta: true,
        errorMessage: '',
        friendlyMessage: ''
      },
      resultSemanas:{
        semana1: '',
        semana2: '',
        semana3: '',
        semana4: ''
      },
      resultDatos:[],
      resultTotal:{
        saldoVirtualTotal: 0,
        anio: 0,
        tetrasemanaAnio: 0,
        esActual: false,
        fechaCorte: '',
        esUltimaFechaCorte: false
      },
      resultSemanasTotal:{
        semana1Total: 0,
        semana2Total: 0,
        semana3Total: 0,
        semana4Total: 0
      }
    }

  }

  ngOnInit(): void {
  }

  public loadData(nomina: number, Anio: string, SemanaAnio: string, TrtrasemanaAnio: string, FechaCorte: string, EsPosterior: Boolean, DiariaSemana: Boolean, callback): void {
    console.log('La Nomina ES: ' + nomina);
    // this.loading = true;
    if(FechaCorte == ''){
      const fecha = new Date();
      FechaCorte = fecha.toISOString();
      EsPosterior = false;
    }

    if(DiariaSemana){
      console.log(+SemanaAnio);
      console.log(+SemanaAnio -1);
      if(EsPosterior){
        SemanaAnio = (+SemanaAnio + 1).toString()
      }else{
        SemanaAnio = (+SemanaAnio - 1).toString()
      }
      if(SemanaAnio == '0'){
        SemanaAnio = '52';
        Anio = (Number(Anio)- 1).toString();
      }
      if(SemanaAnio == '53'){
        SemanaAnio = '1';
        Anio = (Number(Anio) + 1).toString();
      }
      
      console.log(EsPosterior)
      if(this.productividadDiaria.resultAnioSemana.esActual && EsPosterior) return;
      this.GetProductividadDiaria(nomina, Anio, SemanaAnio, FechaCorte, EsPosterior, () => callback());
      
    }else{
      console.log(nomina);
      console.log(Anio);
      console.log(TrtrasemanaAnio);
      console.log(FechaCorte);
      console.log(EsPosterior);
      console.log(DiariaSemana);
      if(EsPosterior){
        TrtrasemanaAnio = (+TrtrasemanaAnio + 1).toString()
      }else{
        TrtrasemanaAnio = (+TrtrasemanaAnio - 1).toString()
      }
      if(TrtrasemanaAnio == '0'){
        TrtrasemanaAnio = '13';
        Anio = (Number(Anio) - 1).toString();
      }
      if(TrtrasemanaAnio == '14'){
        TrtrasemanaAnio = '1';
        Anio = (Number(Anio) + 1).toString();
      }
      if(this.ProductividadSemanal.resultTotal.esActual && EsPosterior) return;
      this.GetProductividadSemanal(nomina, Anio, TrtrasemanaAnio, FechaCorte, EsPosterior, () => callback());
    }
  }

  public cambioProductividad(cambioCarga: boolean){
    var formElementDiaria = <HTMLFormElement>document.getElementById('tblDiaria');
    var formElementSemanal = <HTMLFormElement>document.getElementById('tblSemanal');
    if(cambioCarga){
      formElementDiaria.style.display='block';
      formElementSemanal.style.display = 'none';
    }else{
      formElementDiaria.style.display='none';
      formElementSemanal.style.display = 'block';
    }
  }

  private GetProductividadDiaria(nomina: number, Anio: string, SemanaAnio: string, FechaCorte: string, EsPosterior: Boolean, callback){
    this.service.getProductividadDiaria(nomina.toString(), Anio , SemanaAnio, FechaCorte, EsPosterior)
    .toPromise()
    .then((data: ProductividadDiariaInterface) => {
      if(!data.resultadoEjecucion.ejecucionCorrecta)
      {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      if(data.resultadoEjecucion.ejecucionCorrecta){
        this.productividadDiaria = data;
      }
      console.log(this.productividadDiaria);
      callback();
    })
    .catch(error => {
      console.error(error);
      callback();
    });
  }

  private GetProductividadSemanal(nomina: number, Anio: string, TrtrasemanaAnio: string, FechaCorte: string, EsPosterior: Boolean, callback){
    this.service.getProductividadSemanal(nomina.toString(), Anio , TrtrasemanaAnio, FechaCorte, EsPosterior)
    .toPromise()
    .then((data: ProductividadSemanalInterface) => {
      if(!data.resultadoEjecucion.ejecucionCorrecta)
      {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      if(data.resultadoEjecucion.ejecucionCorrecta){
        this.ProductividadSemanal = data;
      }
      console.log(this.ProductividadSemanal);
      callback();
    })
    .catch(error => {
      console.error(error);
      callback();
    });
  }

}
