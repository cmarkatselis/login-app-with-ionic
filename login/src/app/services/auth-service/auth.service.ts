import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {StorageService} from "../storage-service/storage.service";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthConstants} from "../../config/auth-constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$ = new BehaviorSubject<any>('');

  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private router: Router) { }

  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      console.log(res);
      this.userData$.next(res);
    });
  }

  logIn(postData: any): Observable<any>{
    console.log(postData);
    return this.httpService.post('authenticate/el', postData);
  }

  signUp(postData: any): Observable<any>{
    return this.httpService.post('login', postData);
  }

  logOut() {
    this.storageService.removeItem(AuthConstants.AUTH).then(res => {
      this.router.navigate(['']);
    });
  }
}
