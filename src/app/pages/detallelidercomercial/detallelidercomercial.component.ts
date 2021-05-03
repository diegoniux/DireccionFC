import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detallelidercomercial',
  templateUrl: './detallelidercomercial.component.html',
  styleUrls: ['./detallelidercomercial.component.css']
})
export class DetallelidercomercialComponent implements OnInit {

  nombreTitulo: string
  nombreImg: string

  constructor() {
    this.nombreTitulo = "Detalle Líder Comercial"
    this.nombreImg = "iconoPizarronDigital"
   }

  ngOnInit(): void {
  }

}
