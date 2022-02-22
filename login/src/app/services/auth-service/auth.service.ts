import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {StorageService} from "../storage-service/storage.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthConstants} from "../../config/auth-constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private router: Router) { }

  logIn(postData: any): Observable<any>{
    return this.httpService.post('login', postData);
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
