import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-detallelidercomercial',
  templateUrl: './detallelidercomercial.component.html',
  styleUrls: ['./detallelidercomercial.component.css']
})
export class DetallelidercomercialComponent implements OnInit {

  nombreTitulo: string;
  nombreImg: string;

  form = new FormGroup({
    tipoPeriodo: new FormControl(2, Validators.required)
  });

  constructor(private router: Router) {
    this.nombreTitulo = 'Detalle Líder Comercial';
    this.nombreImg = 'iconoPizarronDigital';
   }

  ngOnInit(): void {
  }

}
