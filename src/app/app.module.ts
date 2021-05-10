import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
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
    TendenciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlertModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
