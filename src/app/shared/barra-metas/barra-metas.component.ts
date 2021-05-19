import { Component, Input, OnInit } from '@angular/core';
import { DetalleGerenciasService } from 'src/app/services/detalle-gerencias-service.service';
import { BarraMetasInterface } from 'src/app/interfaces/barraMetas.interface';
import { PeriodoMesInterface } from 'src/app/interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from 'src/app/interfaces/periodoSemana.interface';
import { LoginInterface } from 'src/app/interfaces/login.interface';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-barra-metas',
  templateUrl: './barra-metas.component.html',
  styleUrls: ['./barra-metas.component.css']
})
export class BarraMetasComponent implements OnInit {
  nomina: number;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  loading: boolean;

  login: LoginInterface;
  barraMetas: BarraMetasInterface;

  constructor(public detalleGerenciaService: DetalleGerenciasService,
              public loginService: LoginService,
              private toastrService: ToastrService) {
      this.loading = false;
   }

  ngOnInit(): void {
    try {
      this.login = this.loginService.getUserLoggedIn();
      this.login.usuarioData.apellidoPaterno = this.login.usuarioData.apellidoPaterno + ' ' + this.login.usuarioData.apellidoMaterno;
    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
    }
  }

  public getBarraMetas(): any
  {
    this.loading = true;
    this.detalleGerenciaService.getBarraMetas(this.nomina, this.idTipoPeriodo, this.periodoSemana.fechaInicial
      , this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: BarraMetasInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.barraMetas = data;
      this.loading = false;
    })
    .catch(error => {
      console.error(error);
    });
  }

}
