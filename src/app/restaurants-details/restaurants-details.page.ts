import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import {Env} from "../../environments/env";

@Component({
  selector: 'app-restaurants-details',
  templateUrl: './restaurants-details.page.html',
  styleUrls: ['./restaurants-details.page.scss'],
})
export class RestaurantsDetailsPage implements OnInit {

  notificationCount: any;
  restData: any;
  rest_id: any;
  comments: any;
  form = {
    post_id: null,
    user_id: null,
    message: null
  }
  constructor(private api: ApiService, private router: Router, private aroute: ActivatedRoute, private other: OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res => {
      this.notificationCount = res;
    })
    this.aroute.params.subscribe(res => {
      this.restaurantDetail(res.id);
      this.restudentShowAllComment(res.id);
      this.rest_id = res.id;
    })
  }

  async menu(){
    const browser = await Browser.open({url:Env.BasePoint+this.restData?.restudent_details?.menu});
  }

  async presentLoading(loading) {
    return await loading.present();
  }
  async restaurantDetail(id) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    const data = {
      post_id: id,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id,
    }
    this.api.restaurantDetailsById(data).subscribe(res => {
      this.restData = res;
      loading.dismiss();
      console.log(this.restData, "==00")
    })
  }

  restudentShowAllComment(id) {
    this.api.restudentShowAllComment(id).subscribe(res => {
      this.comments = res;
    })
  }

  async restudentInsertComment() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.form.user_id = JSON.parse(localStorage.getItem('userData'))?.id
    this.form.post_id = this.rest_id;
    this.api.restudentInsertComment(this.form).subscribe(res => {
      loading.dismiss();
      this.restudentShowAllComment(this.rest_id)
      this.form = {
        post_id: null,
        user_id: null,
        message: null
      }
    })
  }

  async handleFavRestaurant(status) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    const data = {
      user_id: parseInt(JSON.parse(localStorage.getItem('userData'))?.id),
      post_id: parseInt(this.rest_id),
      status: status ==='1' ? 0 : 1
    }
    this.api.restudentInsertLike(data).subscribe(res => {
      loading.dismiss();
      this.restaurantDetail(this.rest_id)
    })

  }

  protected readonly Env = Env;
}
