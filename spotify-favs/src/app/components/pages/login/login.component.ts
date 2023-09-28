import { LoginService } from './../../../services/login.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() isLogged: Boolean = false;

  constructor(
    private loginService: LoginService,
    private spotifyAuthService: SpotifyAuthService,
    private messagesService: MessagesService,
    private router: Router
  ) {
    this.isLogged = this.spotifyAuthService.isSetup;
    if (this.isLogged) {
      this.messagesService.add('Usuario já autenticado');
      this.router.navigate([''], { queryParams: {} });
    }
  }

  login() {
    this.loginService.redirectLogin();
  }
}
