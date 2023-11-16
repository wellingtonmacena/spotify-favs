import { Injectable } from '@angular/core';
import { UserProfileResponse } from '../interfaces/Spotify/UserProfileResponse';
import { SpotifyArtistResponse } from '../interfaces/Spotify/SpotifyArtistResponse';

@Injectable({
  providedIn: 'root',
})
export class StorageSessionService {
  constructor() {}

  setData(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getData(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  get userProfileInfo(): UserProfileResponse | null {
    let userProfileInfoString = this.getData('userProfileInfo');
    if (userProfileInfoString == null) return null;

    return JSON.parse(userProfileInfoString);
  }

  get userTopArtists(): SpotifyArtistResponse | null {
    let userTopArtistsString = this.getData('userTopArtists');
    if (userTopArtistsString == null) return null;

    return JSON.parse(userTopArtistsString);
  }

  get userTopTracks(): SpotifyArtistResponse | null {
    let userTopTracksString = this.getData('userTopTracks');
    if (userTopTracksString == null) return null;

    return JSON.parse(userTopTracksString);
  }

  get artistInfo(): SpotifyArtistResponse | null {
    let userTopTracksString = this.getData('artistInfo');
    if (userTopTracksString == null) return null;

    return JSON.parse(userTopTracksString);
  }
}
