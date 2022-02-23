import { Injectable } from "@angular/core";
import { AuthService} from "../services/auth-service/auth.service";

@Injectable({
  providedIn: 'any'
})

export class UserDataResolver {

  constructor(private authService: AuthService) {
  }

  resolve(){
    console.log('Call a home route');
    return this.authService.getUserData();
  }

}
