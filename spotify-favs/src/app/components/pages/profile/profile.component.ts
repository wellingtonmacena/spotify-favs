import { Component } from '@angular/core';
import { UserProfileResponse } from 'src/app/interfaces/Spotify/UserProfileResponse';
import { StorageSessionService } from 'src/app/services/storage-session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
   userProfile!: UserProfileResponse ;
  constructor(private storageSessionService: StorageSessionService) {
    this.userProfile = this.storageSessionService.userProfileInfo!;
  }
}
