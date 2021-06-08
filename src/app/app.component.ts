import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DireccionFC';


  onActivate(event): void {
    window.scroll(0, 0);
  }
}
