import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { LoadingController } from '@ionic/angular';
import { OtherService } from '../service/other/other.service';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.page.html',
  styleUrls: ['./advertising.page.scss'],
})
export class AdvertisingPage implements OnInit {

  advertisingData:any;
  notificationCount:any;

  constructor(private api:ApiService,private loadingCtrl: LoadingController, private other:OtherService) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.advertising();
  }

  async advertising(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.api.advertising().subscribe(res => {
      loading.dismiss();
      this.advertisingData = res['page_details'][0].page_content;
    },
    err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
