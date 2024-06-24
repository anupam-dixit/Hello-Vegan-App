import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Env} from "../../environments/env";

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.page.html',
  styleUrls: ['./blog-details.page.scss'],
})
export class BlogDetailsPage implements OnInit {

  form = {
    post_id: null,
    user_id: null,
    message: null
  }
  blogData: any;
  blogId: any;
  notificationCount:any;

  constructor(private api: ApiService, private router: Router, private aroute: ActivatedRoute, private other: OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.aroute.params.subscribe(res => {
      this.blogDetails(res.id);
      this.blogId = res.id;
      console.log(res, "=00");
    })
  }

  blogDetails(id) {
    this.api.blogDetails(id).subscribe(res => {
      this.blogData = res;
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
    this.form.post_id = this.blogId;
    this.api.addBlogDetailComment(this.form).subscribe(res => {
      this.blogDetails(this.blogId);
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
