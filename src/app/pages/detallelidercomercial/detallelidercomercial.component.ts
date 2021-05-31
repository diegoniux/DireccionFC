import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DetallegerenciaComponent } from '../../shared/detallegerencia/detallegerencia.component';
import { ControlPeriodosComponent } from '../../shared/control-periodos/control-periodos.component';
import { ComisionEstimadaComponent } from '../../shared/comision-estimada/comision-estimada.component';
import { MejorSaldoComponent } from '../../shared/mejor-saldo/mejor-saldo.component';
import { RelevantesAppsComponent } from '../../shared/relevantes-apps/relevantes-apps.component';
import { VisoreslidercomercialEspecialistariesgoComponent } from '../../shared/visoreslidercomercial-especialistariesgo/visoreslidercomercial-especialistariesgo.component';
import { AvanceLidercomercialComponent } from '../../shared/avance-lidercomercial/avance-lidercomercial.component';

@Component({
  selector: 'app-detallelidercomercial',
  templateUrl: './detallelidercomercial.component.html',
  styleUrls: ['./detallelidercomercial.component.css']
})
export class DetallelidercomercialComponent implements OnInit {

  nombreTitulo: string;
  nombreImg: string;

  // Componentes hijos
  @ViewChild(DetallegerenciaComponent) detalleGerenciaChild: DetallegerenciaComponent;
  @ViewChild(ControlPeriodosComponent) controlPeriodosChild: ControlPeriodosComponent;
  @ViewChild(ComisionEstimadaComponent) comsisionEstimadaChild: ComisionEstimadaComponent;
  @ViewChild(MejorSaldoComponent) mejorSaldoChild: MejorSaldoComponent;
  @ViewChild(VisoreslidercomercialEspecialistariesgoComponent) visoresChild: VisoreslidercomercialEspecialistariesgoComponent;
  @ViewChild(AvanceLidercomercialComponent) avanceChild: AvanceLidercomercialComponent;
  @ViewChild(RelevantesAppsComponent) relevanteChild: RelevantesAppsComponent;


  form = new FormGroup({
    tipoPeriodo: new FormControl(2, Validators.required)
  });

  constructor(private router: Router) {
    this.nombreTitulo = 'Detalle Líder Comercial';
    this.nombreImg = 'iconoPizarronDigital';
   }

  ngOnInit(): void {
  }

}
