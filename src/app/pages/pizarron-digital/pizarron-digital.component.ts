import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizarron-digital',
  templateUrl: './pizarron-digital.component.html',
  styleUrls: ['./pizarron-digital.component.css']
})
export class PizarronDigitalComponent implements OnInit {

  nombreTitulo: string

  constructor() { 
    this.nombreTitulo = "Pizarrón Digital"
  }

  ngOnInit(): void {
  }

}
