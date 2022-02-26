import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {StorageService} from "../storage-service/storage.service";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$ = new BehaviorSubject<any>('');

  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private router: Router) { }

  getUserData() {
    this.storageService.getToken().then(res => {
      // console.log(res);
      this.userData$.next(res);
    });
  }

  logIn(postData: any): Observable<any>{
    // console.log(postData);
    return this.httpService.post('authenticate', postData);
  }

  register(postData: any): Observable<any>{
    // console.log(postData);
    return this.httpService.post('register', postData);
  }

  logOut() {
    this.storageService.removeItem('token').then(res => {
      this.router.navigate(['']);
    });
  }
}
