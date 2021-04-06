import { Component, OnInit } from '@angular/core';
import { ModuloInterface } from '../../interfaces/modulo.interface';
import { MenuInterface } from '../../interfaces/menu.interface';
import { OpcionInterface } from '../../interfaces/opcion.interface';
import { InfoApp } from '../../interfaces/infoApp.interface';
import { InfoAppService } from '../../services/info-app.service';
import { LoginService } from '../../services/login.service';
import { LoginInterface } from '../../interfaces/login.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public modulo: ModuloInterface;
  public menus: MenuInterface[] = [];
  public opciones: OpcionInterface[] = [];
  infoLogin: LoginInterface;
  infoApp: InfoApp;

  constructor( public infoPagService: InfoAppService,
               public loginService: LoginService ) { }

  ngOnInit(): void {
    this.cargarMenus();
  }

  cargarMenus(): any {
    this.infoLogin = this.loginService.getUserLoggedIn();
    this.modulo = this.loginService.getModuloActual();
    this.infoApp = this.loginService.getInfoApp();

    if (!this.modulo) {
      return;
    }

    // Obtenemos los menús para módulo
    this.loginService.getMenus(this.modulo.idModulo, this.infoLogin.objUsuario.idPerfil)
    .subscribe( (resp: MenuInterface[]) => {
      resp.forEach( (menu) => {
        this.loginService.getOpciones(menu.idMenu, this.infoLogin.objUsuario.idPerfil)
        .subscribe( (opciones: OpcionInterface[]) => {
          menu.listOpciones = opciones;
          this.menus.push(menu);
        });
      });
    });
  }
}
