import { MessagesService } from './../../services/messages.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileResponse } from 'src/app/interfaces/Spotify/UserProfileResponse';
import { StorageSessionService } from 'src/app/services/storage-session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() profilePhoto: string = '';
  @Input() userProfileInfo!: UserProfileResponse;

  constructor(
    private storageSessionService: StorageSessionService,
    private messagesService: MessagesService,
    private router: Router,
  ) {
    if (this.storageSessionService.userProfileInfo != null) {
      this.userProfileInfo = this.storageSessionService.userProfileInfo;
      this.profilePhoto = this.userProfileInfo.images[1].url;
    } else {
      this.profilePhoto = '../../../assets/account.png';
    }
  }

  logout() {
    sessionStorage.clear();
    console.log('logout');
    this.router.navigate([''], { queryParams: {} });
  }
}
