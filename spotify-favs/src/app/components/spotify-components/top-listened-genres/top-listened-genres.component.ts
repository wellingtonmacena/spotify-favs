import { Component, Input } from '@angular/core';
import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faEtsy } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { Artist } from 'src/app/interfaces/Spotify/SpotifyArtistResponse';
import { ChartItem } from 'src/app/interfaces/ChartItem';

@Component({
  selector: 'app-top-listened-genres',
  templateUrl: './top-listened-genres.component.html',
  styleUrls: ['./top-listened-genres.component.css'],
})
export class TopListenedGenresComponent {
  allArtists: Artist[] = [];
  artists: Artist[] = [];
  @Input() chartItems: ChartItem[] = [];
  @Input() allChartItems: ChartItem[] = [];
  @Input() chartItemsPossibleColors: string[] = [];
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
        artistsQuantity: new FormControl('15'),
      });

      this.getUserTopArtists();
      this.chartItemsPossibleColors = [
        '#D8F3DC',
        '#95D5B2',
        '#52B788',
        '#2D6A4F',
        '#081C15',
        '#99FF99',
        '#A3B18A',
        '#718355',
        '#2A9134',
        '#D8F3DC',
      ];
    } else {
      this.messagesService.add('You are not logged');
    }
  }

  get timeRange(): string {
    return this.searchForm.get('timeRange')!.value;
  }

  get artistsQuantity(): string {
    return this.searchForm.get('artistsQuantity')!.value;
  }

  async getUserTopArtists() {
    let stop = false;
    let limit = 15;
    let responseItems: Artist[] = [];
    let numberArtistQuantity = Number(this.artistsQuantity);

    let response = await this.spotifyService.getUserTopArtists(
      this.timeRange,
      limit.toString()
    );

    responseItems = [...responseItems, ...response.items];
    stop =
      response.next == null || responseItems.length >= numberArtistQuantity;

    while (!stop) {
      response = await this.spotifyService.getUserTopArtistsNext(response.next);
      responseItems = [...responseItems, ...response.items];

      stop =
        response.next == null || responseItems.length >= numberArtistQuantity;
    }

    responseItems = responseItems.slice(0, numberArtistQuantity);

    this.allArtists = responseItems;
    this.artists = this.allArtists;
    this.chartItems = this.getAllGenres(response.items);
    this.allChartItems = this.chartItems;
  }

  getAllGenres(artists: Artist[]): ChartItem[] {
    let genres: string[] = [];
    let chartData = new Map<string, number>();
    let chartItems: ChartItem[] = [];
    let auxChartItemsPossibleColors = this.chartItemsPossibleColors;

    artists.forEach((item) => genres.push(...item.genres));
    for (let item of genres) {
      if (chartData.has(item)) {
        let count = chartData.get(item)!;
        chartData.set(item, count + 1);
      } else {
        chartData.set(item, 1);
      }
    }

    let filteredSortedMap = Array.from(chartData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    let sortedMap = new Map(Array.from(filteredSortedMap));

    for (let item of sortedMap) {
      let randomNumber = Math.floor(
        Math.random() * auxChartItemsPossibleColors.length
      );

      let chartItem: ChartItem = {
        name: item[0],
        count: item[1],
        color: auxChartItemsPossibleColors[randomNumber],
      };
      chartItems.push(chartItem);
      auxChartItemsPossibleColors.splice(randomNumber, 1);
    }

    return chartItems;
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (value == '') {
      this.chartItems = this.allChartItems;
    } else {
        this.chartItems = this.chartItems.filter(
          (item) => item.name != null && item.name.toLowerCase().includes(value)
        );

    }
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
