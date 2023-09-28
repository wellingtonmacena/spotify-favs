import { Component, Input } from '@angular/core';
import { LoginService } from './../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyAuthResponse } from 'src/app/interfaces/SpotifyAuthResponse';
import { MessagesService } from 'src/app/services/messages.service';
import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { StorageSessionService } from 'src/app/services/storage-session.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent {
  @Input() isLogged: Boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private storageSessionService: StorageSessionService,
    private spotifyAuthService: SpotifyAuthService,
    private messagesService: MessagesService
  ) {

    if(spotifyAuthService.access_token != null){
      console.log(spotifyAuthService);

    }else{
      setTimeout(() => {
        console.log('getAllQueryParams');
      }, 3000);

      this.loginService.getAllQueryParams();


      setTimeout(() => {
        console.log('getAcessToken');
      }, 3000);
      this.loginService.getAcessToken();
    }


  }

  ngOnInit() {



  }
}
