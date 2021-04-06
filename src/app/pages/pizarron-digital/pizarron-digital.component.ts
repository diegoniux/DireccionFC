import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizarron-digital',
  templateUrl: './pizarron-digital.component.html',
  styleUrls: ['./pizarron-digital.component.css']
})
export class PizarronDigitalComponent implements OnInit {

  nombreTitulo: string
  nombreImg: string

  constructor() { 
    this.nombreTitulo = "Pizarrón Digital"
    this.nombreImg = "iconoPizarronDigital"
  }

  ngOnInit(): void {
  }

}
