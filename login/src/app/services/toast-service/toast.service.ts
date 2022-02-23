import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(informationMessage: string) {
    const toast = await this.toastController.create({
      message: informationMessage,
      duration: 2000
    });
    await toast.present();
  }

  async presentToastWithOptions(header: string, informationMessage: string, color: string, icon: string, position: 'top' | 'bottom' | 'middle', duration: number) {
    const toast = await this.toastController.create({
      header: header,
      animated: true,
      color: color,
      message: informationMessage,
      icon: icon,
      position: position,
      duration: duration
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
