import { Component, Input } from '@angular/core';
import { Artist } from 'src/app/interfaces/Spotify/SpotifyArtistResponse';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faEtsy } from '@fortawesome/free-brands-svg-icons';
import { StorageSessionService } from 'src/app/services/storage-session.service';
import { UserProfileResponse } from 'src/app/interfaces/Spotify/UserProfileResponse';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.css'],
})
export class ArtistInfoComponent {
  @Input() artistItem!: Artist;
  artistTopTracks!: any;
  userProfile!: UserProfileResponse;
  faE = faEtsy;

  constructor(
    private spotifyService: SpotifyService,
    private storageSessionService: StorageSessionService
  ) {}

  ngOnInit() {
    this.test();
  }

  async test() {
    this.artistItem = await this.spotifyService.GetArtistById(
      this.artistItem.id
    );

    this.userProfile = this.storageSessionService.userProfileInfo!;
    this.artistTopTracks = (
      await this.spotifyService.GetArtistTopTracks(
        this.artistItem.id,
        this.userProfile.country
      )
    ).tracks;
  }

  redirect(url: string) {
    window.open(url, '_blank');
  }

  getArtistGenres(artist: Artist) {
    let genresAux: string[] = [];

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

  convertToSeconds(ms: number): string {
    let sec = ms / 1000;
    let extraSeconds = Math.round(sec % 60).toString();
    if (extraSeconds.toString().length == 1) {
      extraSeconds = `0${extraSeconds}`;
    }
    let minutes = Math.floor(sec / 60);

    return `${minutes}:${extraSeconds}`;
  }
}
