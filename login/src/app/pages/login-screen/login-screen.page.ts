import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {AuthService} from "../../services/auth-service/auth.service";
import {StorageService} from "../../services/storage-service/storage.service";
import {ToastService} from "../../services/toast-service/toast.service";

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
              private toastService: ToastService,
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
        Validators.minLength(8)
      ]))
    })

  }

   loginAction(): void {
    if (this.validationFormUser.value) {
      this.authService.logIn(this.validationFormUser.value).subscribe((res: any) => {
        if (res.jwt) {
          this.storageService.setKeyToStorage('token', res.body.jwt);
          this.router.navigate(['tabs']);
          this.toastService.presentToast(res.metadata.message);
        } else {
          this.toastService.presentToast('Incorrect username or password');
        }
      },
        ((error: any) => {
          this.toastService.presentToastWithOptions('','Network connection error', 'warning', 'information-circle', 'top', 2000);
        })
      );
    } else {
      this.toastService.presentToast('Please give some information');
    }
  }

  registerUser(){
    this.nav.navigateForward(['sign-up']).then(r => console.log(r));
  }

  forgotPassword(){
    this.nav.navigateForward(['forgot-password']).then(r => console.log(r));
  }
}
