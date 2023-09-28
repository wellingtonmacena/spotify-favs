import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { SpotifyResponse } from '../interfaces/Spotify/SpotifyResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';
import querystring from 'query-string';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(
    private spotifyAuthService: SpotifyAuthService
  ) {}

  async getFavoritesArtists(): Promise<Observable<SpotifyResponse> | null> {
    if (this.spotifyAuthService.queryParams == null) {
      console.log('Você precisa se logar primeiro');
      return null;
    }

    return null;
  }

  async getUserProfileInfo() {
    var accessToken = this.spotifyAuthService.accessToken
    await axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      console.log(response);
    });
  }
}
