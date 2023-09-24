import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router) {}

  generateRandomString(length: number) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  redirectLogin() {
    var client_id = environment.spotifyClientId;
    var redirect_uri = environment.spotifyRedirectURI;

    var state = this.generateRandomString(16);
    var scope = environment.spotifyReadScope

    var queryParams = {
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    };

    const queryParamsString = new HttpParams({ fromObject: queryParams}).toString();

    var spotifyAuthLogin = 'https://accounts.spotify.com/authorize?' + queryParamsString;

    window.location.href = spotifyAuthLogin;
  }
}
