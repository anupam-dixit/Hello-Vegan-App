import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {environment} from "../../environments/environment";
import {Env} from "../../environments/env";

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.page.html',
  styleUrls: ['./dashboard-details.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardDetailsPage implements OnInit {

  dashboardData: any;
  postId: any;
  notificationCount:any;
  comment: any;
  constructor(private api: ApiService, private router: Router, private aroute: ActivatedRoute, private other: OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.aroute.params.subscribe(res => {
      this.detailData(res?.id);
      this.postId = res?.id;
      console.log(res);
    })
  }
  detailData(id) {
    this.api.dashboardDetail(id).subscribe(res => {
      this.dashboardData = res;
      console.log(res);
    })
  }
  async presentLoading(loading) {
    return await loading.present();
  }

  enterComment(event) {
    this.comment = event.target.value;
  }

  async addComment() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    let data = {
      post_id: this.postId,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id,
      message: this.comment
    }
    this.api.dashboardInsertComment(data).subscribe(res => {
      this.detailData(this.postId)
      loading.dismiss();
      this.other.presentToast('Comment posted successful !!', 'checkmark-circle-outline', 'success');
    },
      err => {
        loading.dismiss();
        this.other.presentToast('Something went Wrong!!', 'information-circle-outline', 'danger');
      })
  }

  protected readonly environment = environment;
  protected readonly Env = Env;
}
