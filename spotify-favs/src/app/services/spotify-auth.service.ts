import { Injectable } from '@angular/core';
import { SpotifyAuthResponse } from '../interfaces/SpotifyAuthResponse';
import { StorageSessionService } from './storage-session.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyAuthService {

  constructor(private storageSessionService: StorageSessionService) {

  }

  get queryParams() {
    let queryParams1: SpotifyAuthResponse | null = {
      code: this.storageSessionService.getData('code')!,
      state: this.storageSessionService.getData('state')!,
    };

    if (queryParams1.code == null && queryParams1.state == null) {
      queryParams1 = null;
    }

    return queryParams1 ;
  }

  get isSetup(): Boolean {
    return this.accessToken != null;
  }

  get refreshToken() {
    return this.storageSessionService.getData('refresh_token');
  }

  get accessToken() {
    return this.storageSessionService.getData('access_token');
  }
}
