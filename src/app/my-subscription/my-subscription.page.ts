import { Component, OnInit } from '@angular/core';
import {ApiService} from "../service/api/api.service";
import {myLib} from "../../helpers/myLib";
import {endpoints} from "../../environments/endpoints";
import {Env} from "../../environments/env";

@Component({
  selector: 'app-my-subscription',
  templateUrl: './my-subscription.page.html',
  styleUrls: ['./my-subscription.page.scss'],
})
export class MySubscriptionPage implements OnInit {
  subscription:any
  allSubscriptions:any
  constructor(private api: ApiService) { }

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
}
