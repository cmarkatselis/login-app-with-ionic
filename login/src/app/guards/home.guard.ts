import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {StorageService} from "../services/storage-service/storage.service";
import {AuthConstants} from "../config/auth-constants";

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(private storageService: StorageService,
              private router: Router) {
  }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.storageService.getToken().then(res => {
        console.log(res);
        if (res) {
          resolve(true);
        } else {
          this.router.navigate(['']);
          resolve(false);
        }
      }).catch(err => {
        resolve(false);
      });
    });
  }

}
