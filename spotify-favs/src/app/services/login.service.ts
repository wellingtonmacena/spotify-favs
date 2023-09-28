import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams} from '@angular/common/http';
import { SpotifyAuthService } from './spotify-auth.service';
import { StorageSessionService } from './storage-session.service';
import { Buffer } from 'node_modules/buffer/index';
import axios from 'axios';
import querystring from 'query-string';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private router: Router,
    private spotifyAuthService: SpotifyAuthService,
    private storageSessionService: StorageSessionService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  private generateRandomString(length: number) {
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
    var scope = environment.spotifyReadScope;

    var queryParams = {
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    };

    const queryParamsString = new HttpParams({
      fromObject: queryParams,
    }).toString();

    var spotifyAuthLogin =
      'https://accounts.spotify.com/authorize?' + queryParamsString;

    window.location.href = spotifyAuthLogin;
    setTimeout(() => {}, 3000);
  }

  getAllQueryParams() {
    this.route.queryParams.subscribe((params: { [x: string]: string }) => {
      if (params['code'] != undefined && params['state'] != undefined) {
        this.storageSessionService.setData('code', params['code']);
        this.storageSessionService.setData('state', params['state']);
      }
    });
  }

  async getAcessToken() {
    var code1 = this.spotifyAuthService.queryParams?.code;

    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code1,
        redirect_uri: environment.spotifyRedirectURI
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${  Buffer.from(`${environment.spotifyClientId}:${environment.spotifyClientSecret}`).toString('base64')}`,
      },
    })
      .then(response => {
        if(response.status==200){
          this.storageSessionService.setData('access_token', response.data.access_token);
          this.router.navigate([''], { queryParams: {} });
        }
        console.log(response);
      })
  }
}
