
import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { SpotifyAuthResponse } from '../../../interfaces/Spotify/SpotifyAuthResponse';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { environment } from 'src/environments/environments';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Artist } from 'src/app/interfaces/Spotify/SpotifyArtistResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  allArtists: Artist[] = [];
  artists: Artist[] = [];
  faSearch = faSearch;
  searchTerm: string = '';

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private spotifyAuthService: SpotifyAuthService
  ) {
    if (spotifyAuthService.isSetup) {
      var response = this.spotifyService.getUserTopArtists();
      this.allArtists = response.items;
      this.artists = response.items;
      console.log(this.allArtists);
    } else {
      console.log('not logged');
    }
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (value == '') {
      this.artists = this.allArtists;
    } else {
      this.artists = this.allArtists.filter(
        (item) => item.name != null && item.name.toLowerCase().includes(value)
      );
    }
  }

  redirect(url: string) {
    window.open(url, "_blank");
  }

  getArtistGenres(artist:Artist){
    //artist.genres.forEach(item => item.CA)
  }
}
