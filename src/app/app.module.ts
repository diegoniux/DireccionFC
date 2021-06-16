import { NgModule, LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(es);
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';
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
import { PerfilUsuarioComponent } from './shared/perfil-usuario/perfil-usuario.component';
// Interceptors
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ControlPeriodosComponent } from './shared/control-periodos/control-periodos.component';
import { ComisionEstimadaComponent } from './shared/comision-estimada/comision-estimada.component';
import { DetallegerenciaComponent } from './shared/detallegerencia/detallegerencia.component';
import { ChartsModule } from 'ng2-charts';
import { VisoreslidercomercialEspecialistariesgoComponent } from './shared/visoreslidercomercial-especialistariesgo/visoreslidercomercial-especialistariesgo.component';
import { AvanceLidercomercialComponent } from './shared/avance-lidercomercial/avance-lidercomercial.component';
import { RelevantesAppsComponent } from './shared/relevantes-apps/relevantes-apps.component';
import { DetalleDirectorComercialComponent } from './pages/detalle-director-comercial/detalle-director-comercial.component';
import { DetalleDireccionComercialComponent } from './shared/detalle-direccion-comercial/detalle-direccion-comercial.component';
import { PlantillaDirectorComercialComponent } from './shared/plantilla-director-comercial/plantilla-director-comercial.component';
import { HeaderDirectorComercialComponent } from './shared/header-director-comercial/header-director-comercial.component';

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
    ReporteGerenciasComponent,
    PerfilUsuarioComponent,
    ControlPeriodosComponent,
    ComisionEstimadaComponent,
    DetallegerenciaComponent,
    VisoreslidercomercialEspecialistariesgoComponent,
    AvanceLidercomercialComponent,
    RelevantesAppsComponent,
    DetalleDirectorComercialComponent,
    DetalleDireccionComercialComponent,
    PlantillaDirectorComercialComponent,
    HeaderDirectorComercialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
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
    ChartsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-MX'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
