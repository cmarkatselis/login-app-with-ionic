import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
  }

  async storeToken(token: any) {
    const encryptedValue = btoa(escape(JSON.stringify(token)));
    await this.storage.set('token', {
      property: encryptedValue
    });
  }

  async getToken() {
    const res = await this.storage.get('token');
    if (res.value) {
      return JSON.parse(unescape(atob(res.value)));
    } else {
      return false;
    }
  }

  async removeItem(storageKey: string) {
    await this.storage.remove('token');
  }

  async clear() {
    await this.storage.clear();
  }
}
