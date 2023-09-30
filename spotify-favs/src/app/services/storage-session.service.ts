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
    var userProfileInfoString = this.getData('userProfileInfo');
    if (userProfileInfoString == null) return null;

    return JSON.parse(userProfileInfoString);
  }

  get userTopArtists(): SpotifyArtistResponse | null {
    var userProfileInfoString = this.getData('userTopArtists');
    if (userProfileInfoString == null) return null;

    return JSON.parse(userProfileInfoString);
  }
}
