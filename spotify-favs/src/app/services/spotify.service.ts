import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { Injectable } from '@angular/core';
import { SpotifyArtistResponse } from '../interfaces/Spotify/SpotifyArtistResponse';
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

   getUserTopArtists(time_range:string = 'medium_term',limit:string = '10', offset:string = '0' ):SpotifyArtistResponse {
    var accessToken = this.spotifyAuthService.accessToken
     axios({
      method: 'get',
      url: `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&limit=${limit}&offset=${offset}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      this.storageSessionService.setData("userTopArtists", JSON.stringify(response.data))
    });

    return this.storageSessionService.userTopArtists!;
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
