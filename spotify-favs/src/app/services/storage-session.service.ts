import { Injectable } from '@angular/core';
import { UserInfo } from '../interfaces/Spotify/UserProfile';

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

  get userProfileInfo(): UserInfo | null {
    var userProfileInfoString = this.getData('userProfileInfo');
    if (userProfileInfoString == null) return null;

    return JSON.parse(userProfileInfoString);
  }
}
