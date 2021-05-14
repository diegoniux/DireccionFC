import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  @Input() imgFoto: string;
  @Input() Nombre: string;
  @Input() Apellido: string;
  @Input() Sucursal: string;


  constructor() { }

  ngOnInit(): void {
  }

}
