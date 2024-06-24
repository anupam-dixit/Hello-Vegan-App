import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {environment} from "../../environments/environment";
import {Env} from "../../environments/env";

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.page.html',
  styleUrls: ['./recipes-details.page.scss'],
})
export class RecipesDetailsPage implements OnInit {

  recipeData:any;
  notificationCount:any;
  recipeId:any;
  form = {
    post_id: null,
    user_id: null,
    message: null
  }

  constructor(private api:ApiService, private router:Router, private aroute:ActivatedRoute , private other:OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.aroute.params.subscribe(res=>{
      this.recipeDetails(res.id);
      this.recipeId = res.id;
      console.log(res);
    })
  }

  recipeDetails(id){
    this.api.recipeDetails(id).subscribe(res=>{
      this.recipeData = res;
      this.recipeShowAllComment(id)
      console.log(this.recipeData.receipes);
    })
  }

  recipeShowAllComment(id){
    this.api.recipeShowAllComment(id).subscribe(res=>{
      this.recipeData.comments = res['comment'];
      console.log(this.recipeData);
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
    this.form.post_id = this.recipeId;
    this.api.recipeInsertComment(this.form).subscribe(res => {
      this.recipeDetails(this.recipeId);
      loading.dismiss();
      this.other.presentToast('Comment posted successful !!','checkmark-circle-outline','success');

    },
    err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  protected readonly environment = environment;
  protected readonly Env = Env;
}
