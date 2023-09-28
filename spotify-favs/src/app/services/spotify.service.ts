import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { SpotifyResponse } from '../interfaces/Spotify/SpotifyResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/api/v1/moments`;

  constructor(
    private http: HttpClient,
    private spotifyAuthService: SpotifyAuthService
  ) {}

  async getFavoritesArtists(): Promise<Observable<SpotifyResponse> | null> {
    if (this.spotifyAuthService.queryParams == null) {
      console.log('Você precisa se logar primeiro');
      return null;
    }

    return null;
  }
}
