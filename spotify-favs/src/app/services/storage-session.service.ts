import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageSessionService {

  constructor() { }

  setData(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

 getData(key: string): string | null {
    return sessionStorage.getItem(key);
  }
}
