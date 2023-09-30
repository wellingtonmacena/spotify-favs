import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { Injectable } from '@angular/core';
import { SpotifyResponse } from '../interfaces/Spotify/SpotifyResponse';
import { Observable } from 'rxjs';
import axios from 'axios';
import { StorageSessionService } from './storage-session.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(
    private spotifyAuthService: SpotifyAuthService,
    private storageSessionService: StorageSessionService,
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
     axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      this.storageSessionService.setData("userProfileInfo", JSON.stringify(response.data))
    });
  }
}
