import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-spotify-header',
  templateUrl: './spotify-header.component.html',
  styleUrls: ['./spotify-header.component.css'],
})
export class SpotifyHeaderComponent {
  @Input() currentTabName: string = '';
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
  tabs!: HTMLCollectionOf<HTMLAnchorElement>;

  ngOnInit() {
    this.tabs = document
      .getElementById('spotify-header-navigation')!
      .getElementsByTagName('a');
    console.log(this.tabs);
    this.selectTabByTagName(this.currentTabName);
  }

  changeComponent(event: Event) {
    const target = event.target as HTMLLinkElement;
    const value = target.innerText;
    if (this.currentTabName != value) {
      this.currentTabName = value;
      this.emitter.emit(this.currentTabName);
    }
  }

  selectTab(event: Event): void {
    const target = event.target as HTMLLIElement;
    this.deselectAllTabs();
    target.classList.add('active');
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
}
