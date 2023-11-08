import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { Injectable } from '@angular/core';
import { SpotifyArtistResponse } from '../interfaces/Spotify/SpotifyArtistResponse';
import axios from 'axios';
import { StorageSessionService } from './storage-session.service';
import { SpotifyTrackResponse } from '../interfaces/Spotify/SpotifyTrackResponse';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {

  constructor(
    private spotifyAuthService: SpotifyAuthService,
    private storageSessionService: StorageSessionService
  ) {}

  async getUserTopArtists(
    time_range: string,
    limit: string,
    offset: string = '0'
  ): Promise<SpotifyArtistResponse> {
    if (time_range == '') time_range = 'medium_term';
    if (limit == '') limit = '10';

    var accessToken = this.spotifyAuthService.accessToken;
    var response:any = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&limit=${limit}&offset=${offset}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    this.storageSessionService.setData(
      'userTopArtists',
      JSON.stringify(response.data));

    return response.data ;
  }

  async getUserTopTracks(
    time_range: string,
    limit: string,
    offset: string = '0'
  ): Promise<SpotifyTrackResponse> {
    if (time_range == '') time_range = 'medium_term';
    if (limit == '') limit = '10';

    var accessToken = this.spotifyAuthService.accessToken;
    var response:any = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=${limit}&offset=${offset}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    this.storageSessionService.setData(
      'userTopTracks',
      JSON.stringify(response.data));

      console.log(response.data);
    return response.data ;
  }


  async getUserProfileInfo() {
    var accessToken = this.spotifyAuthService.accessToken;
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      this.storageSessionService.setData(
        'userProfileInfo',
        JSON.stringify(response.data)
      );
    });
  }
}
