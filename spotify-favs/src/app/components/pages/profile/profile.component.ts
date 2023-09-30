import { Component } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/Spotify/UserProfile';
import { StorageSessionService } from 'src/app/services/storage-session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
   userProfile!: UserInfo ;
  constructor(private storageSessionService: StorageSessionService) {
    this.userProfile = this.storageSessionService.userProfileInfo!;
  }
}
