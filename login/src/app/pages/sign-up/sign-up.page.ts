import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertController, LoadingController, ModalController, NavController} from "@ionic/angular";
import {TermsAndConditionPage} from "../terms-and-condition/terms-and-condition.page";
import {AuthService} from "../../services/auth-service/auth.service";
import {AuthConstants} from "../../config/auth-constants";
import {ToastService} from "../../services/toast-service/toast.service";

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
      {type: "required", message: "Password is required"},
      {type: "minlength", message: "Password must be at least 8 character"},
      {type: "pattern", message: "Password must contain at least one special character, one uppercase character, one lowercase character and one numeric value"}
    ],
    confirmPassword: [
      {type: "required", message: "Confirm password is required"},
      {type: "minlength", message: "Password must be at least 8 character"},
      {type: "pattern", message: "Confirm password must contain at least one special character, one uppercase character, one lowercase character and one numeric value"}
    ],
    termsAndCondition: [
      {type: "required", message: "You must accept our Terms and Conditions"}
    ]
  }

  ValidationFormUSer : FormGroup;
  loading:any;

  modalDataResponse: any;

  constructor(private router: Router,
              private navCtrl: NavController,
              private formBuilder: FormBuilder,
              public modalCtrl: ModalController,
              public loadingCtrl : LoadingController,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private toastService: ToastService) { }

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
      ])),

      termsAndCondition: new FormControl(null, Validators.compose([
        Validators.required
      ])),

      type: new FormControl(null)

    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  registerUser() {
    this.ValidationFormUSer.controls.type.setValue('CUSTOM');
    this.authService.register(this.ValidationFormUSer.value).subscribe((res: any) => {
        if (res === null) {
          this.toastService.presentToast('Successful register.');
          this.router.navigate(['']);
        } else {
          this.toastService.presentToast('Something went wrong, fill again.');
        }
      },
      ((error: any) => {
        this.toastService.presentToastWithOptions('','Network connection error', 'warning', 'information-circle', 'top', 2000);
      })
    );
  }

  async  openTermsAndConditionModal() {
    const modal = await this.modalCtrl.create({
      component: TermsAndConditionPage,
      componentProps: {
        'name': 'The Winter Soldier'
      }
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
      }
    });

    return await modal.present();
  }
}
