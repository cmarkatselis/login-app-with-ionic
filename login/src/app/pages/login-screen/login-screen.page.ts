import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
import {AuthConstants} from "../../config/auth-constants";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.page.html',
  styleUrls: ['./login-screen.page.scss'],
})
export class LoginScreenPage implements OnInit {

  validationUserMessage ={
    email:[
      {type:"required", message:"Please enter your Email"},
      {type:"pattern", message:"The Email entered is Incorrect.Try again"}
    ],
    password:[
      {type:"required", message:"please Enter your Password!"},
      {type:"minlength", message:"The Password must be at least 5 characters or more"}

    ]
  }

  validationFormUser: FormGroup;

  constructor(public formBuilder: FormBuilder,
              private authService: AuthService,
              private storageService: StorageService,
              private router: Router,
              private nav: NavController) { }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.validationFormUser = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    })

  }

   loginAction(): void {
    console.log(this.validationFormUser.value);
    if (this.validationFormUser.value) {
      this.authService.logIn(this.validationFormUser.value).subscribe((res: any) => {
        if (res.token) {
          this.storageService.store(AuthConstants.AUTH, res.token);
          this.router.navigate(['home']);
        } else {
          console.log('Incorrect username or password');
        }
      },
        ((error: any) => {
          console.log('Network connection error');
        })
      );
    }
  }
}
