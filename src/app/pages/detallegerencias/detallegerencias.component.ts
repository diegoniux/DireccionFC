import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detallegerencias',
  templateUrl: './detallegerencias.component.html',
  styleUrls: ['./detallegerencias.component.css']
})
export class DetallegerenciasComponent implements OnInit {

  nombreTitulo: string
  nombreImg: string

  constructor() {
    this.nombreTitulo = "Detalle Gerencias"
    this.nombreImg = "iconoPizarronDigital"
   }

  ngOnInit(): void {
  }

}
