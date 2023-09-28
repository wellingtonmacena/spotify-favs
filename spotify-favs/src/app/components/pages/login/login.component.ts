import { LoginService } from './../../../services/login.service';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyAuthResponse } from 'src/app/interfaces/SpotifyAuthResponse';
import { MessagesService } from 'src/app/services/messages.service';
import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { StorageSessionService } from 'src/app/services/storage-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private queryParams: SpotifyAuthResponse | null = {};
  @Input() isLogged: Boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private spotifyAuthService: SpotifyAuthService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    // this.queryParams = this.spotifyAuthService.queryParams;
    // this.isLogged = this.queryParams != null;

    // if (this.isLogged) {
    //   this.router.navigate([''], { queryParams: {} });
    //   this.messagesService.add('Você já está autenticado/logado.');
    // }
  }

   login() {
    this.loginService.redirectLogin();
  }
}
