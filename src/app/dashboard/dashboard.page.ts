import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {environment} from "../../environments/environment";
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  dashboardData: any;
  userData: any = JSON.parse(localStorage.getItem('userData')||'{}');
  notificationCount: any;

  constructor(private api: ApiService, private router: Router, private other: OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    // this.other.notificationCount.subscribe(res => {
    //   this.notificationCount = res;
    // })
    // A $( document ).ready() block.
    // $( document ).ready(function() {
    //   // @ts-ignore
    //   new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
    // });
  }

  allData(bool?:any) {
    let data = {
      start: 0,
      limit: 400,
      user_id: this.userData?.id
    }
    this.api.dashboard(data).subscribe((res:any) => {
      this.dashboardData = res;
      if (bool) {
        bool.target.complete()
      }
    })
  }

  ionViewWillEnter() {
    this.other.notificationCount.subscribe(res => {
      this.notificationCount = res;
    })
    this.allData();
  }


  async likePost(status:any, post_id:any) {
    console.log(status)
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    let data = {
      post_id: post_id,
      user_id: this.userData.id,
      status: status
    }
    this.api.dashboardInsertLike(data).subscribe(res => {
      loading.dismiss();
      if (status == 1) {
        this.other.presentToast('Post Liked !!', 'checkmark-circle-outline', 'success');
      }
      else {
        this.other.presentToast('Post Unliked !!', 'checkmark-circle-outline', 'success');
      }
      this.allData();
    }, err => {
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!', 'information-circle-outline', 'danger');
    })
  }

  async presentLoading(loading:any) {
    return await loading.present();
  }

  protected readonly environment = environment;
}
