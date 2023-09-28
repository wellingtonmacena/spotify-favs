import { Injectable } from '@angular/core';
import { SpotifyAuthResponse } from '../interfaces/SpotifyAuthResponse';
import { StorageSessionService } from './storage-session.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyAuthService {
  queryParams: SpotifyAuthResponse | null = {};

  isSetup: Boolean = false;

  constructor(private storageSessionService: StorageSessionService) {
    this.queryParams = {
      code: this.storageSessionService.getData('code')!,
      state: this.storageSessionService.getData('state')!,
    };
    this.isSetup = true;

    if (this.queryParams.code == null && this.queryParams.state == null) {
      this.queryParams = null;
      this.isSetup = true;
    }
  }

  get refresh_token() {
    return this.storageSessionService.getData('refresh_token');
  }

  get  access_token() {
    return this.storageSessionService.getData('access_token');;
  }
}
