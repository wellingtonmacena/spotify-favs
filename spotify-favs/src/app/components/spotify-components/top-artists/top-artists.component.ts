import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  Artist,
  SpotifyArtistResponse,
} from 'src/app/interfaces/Spotify/SpotifyArtistResponse';
import { FormControl, FormGroup } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.css'],
})
export class TopArtistsComponent {
  @Input() artistItem!: Artist;
  @Output() artistItemEmitter: EventEmitter<Artist> =
    new EventEmitter<Artist>();
  allArtists: Artist[] = [];
  artists: Artist[] = [];
  faSearch = faSearch;
  searchTerm: string = '';
  searchForm!: FormGroup;

  constructor(
    private spotifyAuthService: SpotifyAuthService,
    private spotifyService: SpotifyService,
    private messagesService: MessagesService
  ) {
    if (spotifyAuthService.isSetup) {
      this.searchForm = new FormGroup({
        timeRange: new FormControl('short_term'),
        artistQuantity: new FormControl('15'),
      });

      this.getUserTopArtists();
    } else {
      this.messagesService.add('You are not logged');
    }
  }

  get timeRange(): string {
    return this.searchForm.get('timeRange')!.value;
  }

  get artistQuantity(): string {
    return this.searchForm.get('artistQuantity')!.value;
  }

  async getUserTopArtists() {
    let stop = false;
    let limit= 15
    let responseItems: Artist[] = [];
    let numberArtistQuantity = Number(this.artistQuantity);

    let response = await this.spotifyService.getUserTopArtists(
      this.timeRange,
      limit.toString()
    );

    responseItems = [...responseItems, ...response.items];
    stop = response.next == null || responseItems.length >= numberArtistQuantity;

    while (!stop) {
      response = await this.spotifyService.getUserTopArtistsNext(response.next);
      responseItems = [...responseItems, ...response.items];

      stop = response.next == null || responseItems.length >= numberArtistQuantity;
    }

    responseItems = responseItems.slice(0, numberArtistQuantity);

    this.allArtists = responseItems;
    this.artists = this.allArtists;
    console.log(this.artists);
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

  redirect(artist: Artist) {
    this.artistItemEmitter.emit(artist);
  }

  getArtistGenres(artist: Artist) {
    var genresAux: string[] = [];

    artist.genres.forEach((element) => {
      const word = element
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

      genresAux.push(word);
    });

    return genresAux.join(', ');
  }

  changeTimeRange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.searchForm.patchValue({ timeRange: value });
  }

  checkMaximumValue(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (Number(value) > 100) {
      this.messagesService.add('Número máximo é 100');
      this.searchForm.patchValue({ artistQuantity: 100 });
    }
  }
}
