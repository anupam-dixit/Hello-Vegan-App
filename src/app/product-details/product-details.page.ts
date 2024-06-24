import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Env} from "../../environments/env";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  productData:any;
  notificationCount:any;
  productId:any;
  comments:any;
  form = {
    post_id: null,
    user_id: null,
    message: null
  }
  constructor(private api:ApiService, private router:Router, private aroute:ActivatedRoute , private other:OtherService,  private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.aroute.params.subscribe(res=>{
      this.productDetail(res.id);
      this.productShowAllComment(res.id)
      this.productId = res.id;
    })
  }
  productDetail(id){
    this.api.productDetail(id).subscribe(res=>{
      this.productData = res;
      console.log(res);
    })
  }

  productShowAllComment(id){
    this.api.productShowAllComment(id).subscribe(res=>{
      this.comments = res;
      console.log(res)
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
    this.form.post_id = this.productId;
    this.api.productInsertComment(this.form).subscribe(res => {
      this.productShowAllComment(this.productId)
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
