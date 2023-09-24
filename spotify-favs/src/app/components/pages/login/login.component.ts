import { LoginService } from './../../../services/login.service';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyAuthResponse } from 'src/app/interfaces/SpotifyAuthResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private queryParams: SpotifyAuthResponse = {};
  @Input() isLogged: Boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.queryParams = {
      code: this.storageGetData('code')!,
      state: this.storageGetData('state')!,
    };

    this.isLogged = this.queryParams != null;
    if (this.isLogged) this.router.navigate([''], { queryParams: {} });
  }

  login() {
    this.loginService.redirectLogin();
    this.SaveParams();
  }

  SaveParams() {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = { code: params['code'], state: params['state'] };
      this.storageSaveData('code', this.queryParams.code!);
      this.storageSaveData('state', this.queryParams.state!);
    });
  }

  storageSaveData(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  storageGetData(key: string): string | null {
    return sessionStorage.getItem(key);
  }
}
