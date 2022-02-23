import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertController, LoadingController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  validationMessages = {
    firstName: [{type:"required", message:"Please Enter your First Name"}],
    lastName: [{type:"required", message:"Please Enter your Last Name"}],
    // phone: [{type:"required", message:"Please Enter your Phone No"}],
    email: [
      {type:"required",message:"Enter your Email Address"},
      {type:"pattern", message:"Please the Email Entered is Incorrect. Try again!"}
    ],
    password: [
      {type: "required", message: "password is required here"},
      {type: "minlength", message: "Password must be at least 8 character"},
      {type: "pattern", message: "Password must contain at least one special character, one uppercase character, one lowercase character and one numeric value"}
    ],
    confirmPassword: [
      {type: "required", message: "Confirm password is required here"},
      {type: "minlength", message: "Password must be at least 8 character"},
      {type: "pattern", message: "Confirm password must contain at least one special character, one uppercase character, one lowercase character and one numeric value"}
    ]
  }

  ValidationFormUSer : FormGroup;
  loading:any;

  constructor(private router: Router,
              private navCtrl: NavController,
              private formBuilder: FormBuilder,
              public loadingCtrl : LoadingController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.ValidationFormUSer = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required
      ])),

      lastName: new FormControl('', Validators.compose([
        Validators.required
      ])),

      // phone: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),

      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=^.{1,}$)(?=.*\\d)(?=.*[!@#$%^&*]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')
      ])),

      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=^.{1,}$)(?=.*\\d)(?=.*[!@#$%^&*]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')
      ]))

    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  registerUser(value: any) {

  }
}
