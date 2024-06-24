import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Env} from "../../environments/env";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notificationData:any;

  constructor(private api:ApiService, private router:Router, private other:OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.notificationList();
  }

  async notificationList(isLoading = true){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    if(isLoading){
      this.presentLoading(loading);
    }
    this.api.notificationList({userId:JSON.parse(localStorage.getItem('userData')).id}).subscribe(res=>{
      this.notificationData = res;
      if(isLoading){
        loading.dismiss();
      }
    },err=>{
      if(isLoading){
        loading.dismiss();
      }
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  notificationShow(){
    this.api.notificationShow({userId:JSON.parse(localStorage.getItem('userData')).id}).subscribe(res=>{
      this.notificationList(false);
    },err=>{
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  protected readonly Env = Env;
}
