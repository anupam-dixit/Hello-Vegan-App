import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  nCount = new Subject();
  notificationCount = this.nCount.asObservable();

  constructor(private toastController: ToastController, private loadingCtrl: LoadingController) { }

  async presentToast(msg: string,icon: string,customeColor: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      icon: icon,
      color: customeColor,
    });

    await toast.present();
  }

  async showLoading(msg: any) {
    return await this.loadingCtrl.create({
      message: msg,
    });
    // return loading.present();
  }

  setnotificationCount(data: unknown){
    this.nCount.next(data)
  }
}
