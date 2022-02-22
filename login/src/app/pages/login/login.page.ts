import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  gotoLoginPage(){
    this.nav.navigateForward(['login-screen']).then(r => console.log(r));
  }

  registerUser(){
    this.nav.navigateForward(['sign-up']).then(r => console.log(r));
  }


}
