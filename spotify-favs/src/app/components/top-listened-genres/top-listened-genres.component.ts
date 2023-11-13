import { Component } from '@angular/core';
import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import {  faEtsy } from '@fortawesome/free-brands-svg-icons';
import { faSearch  } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { Track, SpotifyTrackResponse} from 'src/app/interfaces/Spotify/SpotifyTrackResponse';

@Component({
  selector: 'app-top-listened-genres',
  templateUrl: './top-listened-genres.component.html',
  styleUrls: ['./top-listened-genres.component.css']
})
export class TopListenedGenresComponent {
  allTracks: Track[] = [];
  tracks: Track[] = [];
  faSearch = faSearch;
  faE = faEtsy;
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
        tracksQuantity: new FormControl('15'),
      });

      this.getUserTopTracks();
    } else {
      this.messagesService.add("You are not logged")
    }
  }


  get timeRange(): string {
    return this.searchForm.get('timeRange')!.value;
  }

  get tracksQuantity(): string {
    return this.searchForm.get('tracksQuantity')!.value;
  }

  async getUserTopTracks() {
    var response: SpotifyTrackResponse =
      await this.spotifyService.getUserTopTracks(
        this.timeRange,
        this.tracksQuantity
      );

    this.allTracks = response.items;
    this.tracks = response.items;
    console.log(this.tracks);
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (value == '') {
      this.tracks = this.allTracks;
    } else {
      this.tracks = this.allTracks.filter(
        (item) => item.name != null && item.name.toLowerCase().includes(value)
      );
    }
  }

  changeTimeRange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.searchForm.patchValue({ timeRange: value });
  }

  checkMaximumValue(event: Event){
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if(Number(value) > 50){
     this.messagesService.add("Número máximo é 50")
      this.searchForm.patchValue({ artistQuantity: 50 });
    }
  }
}
