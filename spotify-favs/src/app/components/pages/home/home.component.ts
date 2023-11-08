
import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @Input() component: string = 'Top Artists';
  constructor() { }

  send(action:any){
    this.component = action;
  }
}
