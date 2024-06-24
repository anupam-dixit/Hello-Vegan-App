import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import {Env} from "../../environments/env";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
export class NewsDetailsPage implements OnInit {

  form = {
    post_id: null,
    user_id: null,
    message: null
  }
  newsId: any;
  newsData:any;
  notificationCount:any;

  constructor(private api:ApiService, private router:Router, private aroute:ActivatedRoute , private other:OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.aroute.params.subscribe(res=>{
      this.newsDetails(res.id);
      this.newsId = res.id;
      console.log(res);
    })
  }

  newsDetails(id){
    this.api.newsDetails(id).subscribe(res=>{
      this.newsData = res;
      console.log(res);
    })
  }
  async presentLoading(loading) {
    return await loading.present();
  }

  async addComment() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.form.user_id = JSON.parse(localStorage.getItem('userData'))?.id
    this.form.post_id = this.newsId;
    this.api.addNewsDetailComment(this.form).subscribe(res => {
      this.newsDetails(this.newsId);
      this.form = {
        post_id: null,
        user_id: null,
        message: null
      }
      loading.dismiss();
      this.other.presentToast('Comment posted successful !!','checkmark-circle-outline','success');
    },
    err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  protected readonly Env = Env;
}
