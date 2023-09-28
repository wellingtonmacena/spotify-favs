import { Component, Input } from '@angular/core';
import { LoginService } from './../../../services/login.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent {
  @Input() isLogged: Boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private spotifyAuthService: SpotifyAuthService,
    private messagesService: MessagesService
  ) {
    if (this.spotifyAuthService.accessToken != null) {
      this.messagesService.add('Usuario já autenticado');
      this.router.navigate([''], { queryParams: {} });
    } else {
      this.loginService.getAllQueryParams();
      while (
        this.spotifyAuthService.queryParams == null ||
        this.spotifyAuthService.queryParams == undefined
      ) {
        setTimeout(() => {
          console.log('waiting: ' + new Date().toLocaleString());
          this.loginService.getAllQueryParams();
        }, 1500);
      }

      setTimeout(() => {
        console.log('getAcessToken');
        this.loginService.getAcessToken();
      }, 3000);
    }
  }
}
