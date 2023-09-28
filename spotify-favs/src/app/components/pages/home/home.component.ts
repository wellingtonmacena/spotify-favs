import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { SpotifyAuthResponse } from './../../../interfaces/SpotifyAuthResponse';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ArtistItem } from 'src/app/interfaces/Spotify/SpotifyResponse';
import { environment } from 'src/environments/environments';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  allArtists: ArtistItem[] = [];
  artists: ArtistItem[] = [];
  faSearch = faSearch;
  searchTerm: string = '';

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private spotifyAuthService: SpotifyAuthService
  ) {
    // if (spotifyAuthService.isSetup) {
    //   this.spotifyService.getFavoritesArtists().then((item) => {
    //     item?.subscribe((item1) => {
    //       console.log(item1);
    //     });
    //   });
    // } else {
    //   console.log('not logged');
    // }
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    //   if (value == '') {
    //     this.moments = this.allMoments;
    //   } else {
    //     this.moments = this.allMoments.filter(
    //       (item) => item.title != null && item.title.toLowerCase().includes(value)
    //     );
    //   }
  }
}
