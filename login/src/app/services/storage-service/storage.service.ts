import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init().then(r => console.log('storage constructor log'));
  }

  async init() {
    this._storage =  await this.storage.create();
  }

  /** Create and expose methods that users of this service can call */
  public setKeyToStorage(key: string, value: any) {
    // console.log('token', value);
    this._storage?.set(key, value);
  }

  async storeToken(token: any) {
    // console.log(token);
    await this._storage.set('token', token);
  }

  async getToken() {
    const res = await this._storage.get('token');
    // console.log(res);
    if (res) {
      // console.log('get token true: ', JSON.parse(unescape(atob(res.value))));
      return res;
    } else {
      // console.log('get token false');
      return false;
    }
  }

  async removeItem(key: string) {
    await this._storage.remove(key);
  }

  async clear() {
    await this._storage.clear();
  }
}
