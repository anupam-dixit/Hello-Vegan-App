import { Component, OnInit } from '@angular/core';
import {ApiService} from "../service/api/api.service";
import {myLib} from "../../helpers/myLib";
import {endpoints} from "../../environments/endpoints";
import {Env} from "../../environments/env";
import {LoadingController} from "@ionic/angular";
import {OtherService} from "../service/other/other.service";

@Component({
  selector: 'app-my-subscription',
  templateUrl: './my-subscription.page.html',
  styleUrls: ['./my-subscription.page.scss'],
})
export class MySubscriptionPage implements OnInit {
  subscription:any
  allSubscriptions:any
  constructor(private api: ApiService,private loadingCtrl:LoadingController,private other:OtherService) {
  }

  ngOnInit() {
    let data = {
      user_id: myLib.auth.get().id
    }
    this.api.getMySubscription(data).subscribe(res => {
      this.subscription=res
    })
    this.api.post(endpoints.subscriptions.listAll,{}).subscribe(res => {
      this.allSubscriptions=res
    })
  }

  protected readonly JSON = JSON;
  protected readonly Env = Env;
  protected readonly myLib = myLib;
  protected readonly parseInt = parseInt;

  async getLink(id: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading)
    this.api.post(endpoints.subscriptions.getPurchaseLink,{subscription_id:id,user_id:myLib.auth.get()?.id}).subscribe((d:any)=>{
      this.other.presentToast(d?.message,'information-circle-outline',d?.status?"success":'danger');
      loading.dismiss()
    })
  }
  async presentLoading(loading) {
    return await loading.present();
  }
}
