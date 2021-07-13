import { Component, OnInit } from '@angular/core';
import { GerentesService } from 'src/app/services/gerentes.service';
import { ComisionEstimadaInterface } from '../../interfaces/ComisionEstimadaGFC.interface';

@Component({
  selector: 'app-comision-bono-pd',
  templateUrl: './comision-bono-pd.component.html',
  styleUrls: ['./comision-bono-pd.component.css']
})
export class ComisionBonoPdComponent implements OnInit {

  ComisionEstimada: ComisionEstimadaInterface;

  constructor(public service: GerentesService) { 
    this.ComisionEstimada = {
      resultadoEjecucion: {
        ejecucionCorrecta: true,
        errorMessage: '',
        friendlyMessage: ''
      },
      comisionEstimada: '$0',
      bonoExcelenciaEstimado: '$0',
    }
  }

  ngOnInit(): void {
  }

  public loadData(nomina: number, FechaCorte: string): void{
    console.log('La Nomina ES: ' + nomina);
    this.GetComisionEstimada(nomina, FechaCorte);
  }

  private GetComisionEstimada(nomina: number, FechaCorte: string){
    this.service.getComisionEstimada(nomina.toString(),FechaCorte)
    .toPromise()
    .then((data: ComisionEstimadaInterface) => {
      if(!data.resultadoEjecucion.ejecucionCorrecta)
      {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      if(data.resultadoEjecucion.ejecucionCorrecta){
        this.ComisionEstimada = data;
      }
      console.log(this.ComisionEstimada);
    })
    .catch(error => {
      console.error(error);
    });
  }

}
