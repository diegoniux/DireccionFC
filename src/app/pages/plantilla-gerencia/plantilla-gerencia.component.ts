import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-gerencia',
  templateUrl: './plantilla-gerencia.component.html',
  styleUrls: ['./plantilla-gerencia.component.css']
})
export class PlantillaGerenciaComponent implements OnInit {
  nombreTitulo: string
  nombreImg: string
  constructor() { 
    this.nombreTitulo = "Productividad Agentes";
    this.nombreImg = "iconoProductividad";
    
  }

  ngOnInit(): void {
  }

}
