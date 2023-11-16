import { Component, Input } from '@angular/core';
import { Artist } from 'src/app/interfaces/Spotify/SpotifyArtistResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @Input() currentTabName: string = 'Top Artists';
  artistItem!: Artist;
  tabs!: HTMLCollectionOf<HTMLAnchorElement>;

  ngOnInit() {
    this.tabs = document
      .getElementById('spotify-header-navigation')!
      .getElementsByTagName('a');
    this.selectTabByTagName(this.currentTabName);
  }

  ngDoCheck(){
    this.deselectAllTabs();
    this.selectTabByTagName(this.currentTabName);
  }

  deselectAllTabs(): void {
    for (let index = 0; index < this.tabs.length; index++) {
      this.tabs[index].classList.remove('active');
    }
  }

  selectTabByTagName(tabName: string): void {
    this.deselectAllTabs();
    for (let index = 0; index < this.tabs.length; index++) {
      if (this.tabs[index].text == tabName) {
        this.tabs[index].classList.add('active');
        break;
      }
    }
  }

  shareCurrentTabName(currentTabName: string) {
    this.currentTabName = currentTabName;
  }

  shareArtistItem(artist: Artist) {
    this.artistItem = artist;
    this.currentTabName = 'Artist\'s Top Tracks';
  }
}
