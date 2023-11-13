import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  component: string ='Top Listened Genres';

  send(action:any){
    this.component = action;
  }
}
