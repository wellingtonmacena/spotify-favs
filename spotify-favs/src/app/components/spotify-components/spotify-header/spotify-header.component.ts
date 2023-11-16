import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-spotify-header',
  templateUrl: './spotify-header.component.html',
  styleUrls: ['./spotify-header.component.css'],
})
export class SpotifyHeaderComponent {
  @Input() currentTabName: string = '';
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();

  changeComponent(event: Event) {
    const target = event.target as HTMLLinkElement;
    const value = target.innerText;
    if (this.currentTabName != value && value !== "Artist\'s Top Tracks") {
      this.currentTabName = value;
      this.emitter.emit(this.currentTabName);
    }
  }
}
