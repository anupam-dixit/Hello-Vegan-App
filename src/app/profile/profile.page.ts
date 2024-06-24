import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {myLib} from "../../helpers/myLib";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileData: any;
  notificationCount: any;
  segmentValue: any;
  posts: any;
  events: any;
  recipes: any;
  blogs: any;
  message: any;
  hideShowId: any;
  hideShowState: any;
  comments: any;
  photos: any;
  subscription:any
  constructor(private api: ApiService, private router: Router, private other: OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    // this.segmentValue = 'posts';
    // this.other.notificationCount.subscribe(res => {
    //   this.notificationCount = res;
    // })
    // this.profile(JSON.parse(localStorage.getItem('userData'))?.id);
    // this.postData()
    let data = {
      user_id: myLib.auth.get().id
    }
    this.api.getMySubscription(data).subscribe(res => {
      this.subscription=res
    })
  }

  ionViewWillEnter() {
    this.segmentValue = 'posts';
    this.other.notificationCount.subscribe(res => {
      this.notificationCount = res;
    })
    this.profile(JSON.parse(localStorage.getItem('userData'))?.id);
    this.postData()
  }

  segmentChanged(e) {
    this.segmentValue = e.detail.value;
    if (e.detail.value === "posts") {
      this.postData()
    }
    else if (e.detail.value === "events") {
      this.eventData()
    }
    else if (e.detail.value === "recipes") {
      this.recipeData()
    }
    else if (e.detail.value === "blog") {
      this.blogData()
    }
    else if (e.detail.value === "photos") {
      this.photosData()
    }
  }
  postData() {
    let data = {
      limit: 4,
      start: 0,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id
    }
    this.api.profilePost(data).subscribe(res => {
      this.posts = res;
    })
  }
  photosData(){
    let data = {
      limit: 4,
      start: 0,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id
    }
    this.api.profilePhoto(data).subscribe(res => {
      this.photos = res;
    })

  }
  addComment(e) {
    this.message = e.target.value;
  }
  postComment(post_id) {
    const data = {
      user_id: JSON.parse(localStorage.getItem('userData'))?.id,
      post_id: post_id,
      message: this.message
    }
    this.api.dashboardInsertComment(data).subscribe(res => {
      console.log(res)
      this.getPostComments()
      this.message = ''
    })
  }
  handleComments(id, type) {
    if (this.hideShowId == id) {
      this.hideShowState = type == 'show' ? 'hide' : 'show';
    }
    else{
      this.hideShowState = 'show';
    }
    this.hideShowId = id;
    this.getPostComments()
  }
  getPostComments() {
    this.api.dashboardDetail(this.hideShowId).subscribe(res => {
      this.comments = res['comment'];
    })
  }
  recipeData() {
    let data = {
      limit: 4,
      start: 0,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id
    }
    this.api.profileRecipe(data).subscribe(res => {
      this.recipes = res;
      console.log(res);
    })
  }
  eventData() {
    let data = {
      limit: 4,
      start: 0,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id
    }
    this.api.profileEvent(data).subscribe(res => {
      this.events = res;
      console.log(res);
    })
  }
  blogData() {
    let data = {
      limit: 4,
      start: 0,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id
    }
    this.api.profileBlog(data).subscribe(res => {
      this.blogs = res;
      console.log(res);
    })
  }

  profile(id) {
    const login_user_id = JSON.parse(localStorage.getItem('userData'))?.id
    this.api.profile(id, login_user_id).subscribe(res => {
      console.log(res)
      this.profileData = res;
    })
  }

  convert(userData) {
    if (userData) {
      return JSON.stringify({
        "id": userData.id,
        "name": userData.name,
        "profile_image": userData.profile_image
      })
    }

  }
  async presentLoading(loading) {
    return await loading.present();
  }

  async likePost(status, post_id) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    let data = {
      post_id: post_id,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id,
      status: status
    }
    this.api.dashboardInsertLike(data).subscribe(res => {
      loading.dismiss();
      if (status == 1) {
        this.other.presentToast('Post Liked !!', 'checkmark-circle-outline', 'success');
      }
      else {
        this.other.presentToast('Post Unliked !!', 'checkmark-circle-outline', 'success');
      }
      this.postData();
    }, err => {
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!', 'information-circle-outline', 'danger');
    })
  }

  protected readonly JSON = JSON;
  protected readonly environment = environment;
}
