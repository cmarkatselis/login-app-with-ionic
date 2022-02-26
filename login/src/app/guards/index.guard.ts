import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {StorageService} from "../services/storage-service/storage.service";

@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate {

  constructor(private storageService: StorageService,
              private router: Router) {
  }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.storageService.getToken().then(res => {
        // console.log(res);
        if (res) {
          this.router.navigate(['tabs']);
          resolve(false);
        } else {
          resolve(true);

        }
      }).catch(err => {
        resolve(false);
      });
    });
  }
}
