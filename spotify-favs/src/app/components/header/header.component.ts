import { MessagesService } from './../../services/messages.service';
import { Component, Input } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/Spotify/UserProfile';
import { StorageSessionService } from 'src/app/services/storage-session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() profilePhoto: string = '';
  @Input() userProfileInfo!: UserInfo | null;

  constructor(private storageSessionService: StorageSessionService, private messagesService: MessagesService) {

    if (this.storageSessionService.userProfileInfo != null) {
      this.userProfileInfo = this.storageSessionService.userProfileInfo;
      this.profilePhoto = this.userProfileInfo.images[1].url;

    } else {
      this.profilePhoto = '../../../assets/account.png';
    }
  }

  noProfileInfo(){
    this.messagesService.add("Você precisa estar logar acessar essa aba")
  }
}
