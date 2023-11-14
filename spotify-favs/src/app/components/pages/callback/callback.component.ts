import { Component, Input } from '@angular/core';
import { LoginService } from './../../../services/login.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { SpotifyService } from 'src/app/services/spotify.service';

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
    private messagesService: MessagesService,
    private spotifyService: SpotifyService,
  ) {

    if (this.spotifyAuthService.accessToken != null) {
      this.messagesService.add('Usuario já autenticado');
      this.router.navigate([''], { queryParams: {} });
    }
    else {
      this.loginService.getAllQueryParams();
      while (
        this.spotifyAuthService.queryParams == null ||
        this.spotifyAuthService.queryParams == undefined
      )

      {
        setTimeout(() => {
          this.loginService.getAllQueryParams();
          console.log('getAllQueryParams? ' + new Date());
        }, 1000);
      }

      setTimeout(() => {
        this.loginService.getAcessToken();
        console.log('getAcessToken? ' + new Date());
      },2000);

      setTimeout(() => {
        this.spotifyService.getUserProfileInfo();
        console.log('getUserProfileInfo? ' + new Date());
        window.location.reload();
        this.router.navigate(['/home'], { queryParams: {} });
      }, 3000);
    }
  }
}
