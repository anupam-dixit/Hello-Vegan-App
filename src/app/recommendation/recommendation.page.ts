import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {environment} from "../../environments/environment";
import {Env} from "../../environments/env";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.page.html',
  styleUrls: ['./recommendation.page.scss'],
})
export class RecommendationPage implements OnInit {

  recommendationData:any;
  notificationCount:any;
  constructor(private api:ApiService, private router:Router, private aroute:ActivatedRoute , private other:OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.recommendation()
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  async recommendation(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.api.recommendation().subscribe(res=>{
      this.recommendationData = res;
      loading.dismiss();
      console.log(res,"000");
    })
  }


  protected readonly environment = environment;
  protected readonly Env = Env;
}
