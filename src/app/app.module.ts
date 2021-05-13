import { NgModule, LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(es);
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule } from './shared/_alert/alert.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PizarronDigitalComponent } from './pages/pizarron-digital/pizarron-digital.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { DetallelidercomercialComponent } from './pages/detallelidercomercial/detallelidercomercial.component';
import { DetallegerenciasComponent } from './pages/detallegerencias/detallegerencias.component';
import { BarraMetasComponent } from './shared/barra-metas/barra-metas.component';
import { MejorSaldoComponent } from './shared/mejor-saldo/mejor-saldo.component';
import { RelevanteComponent } from './shared/relevante/relevante.component';
import { TendenciaComponent } from './shared/tendencia/tendencia.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReporteGerenciasComponent } from './shared/reporte-gerencias/reporte-gerencias.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    PizarronDigitalComponent,
    TituloComponent,
    RankingComponent,
    DetallelidercomercialComponent,
    DetallegerenciasComponent,
    BarraMetasComponent,
    MejorSaldoComponent,
    RelevanteComponent,
    TendenciaComponent,
    ReporteGerenciasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlertModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    NgSelectModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true
    }), // ToastrModule added
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
