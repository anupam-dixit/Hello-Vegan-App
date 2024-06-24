import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Env} from "../../environments/env";

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.page.html',
  styleUrls: ['./public-profile.page.scss'],
})
export class PublicProfilePage implements OnInit {

  profileData: any;
  posts: any;
  userId:any;
  segmentValue = 'posts';
  notificationCount:any;
  message: any;
  hideShowId: any;
  hideShowState: any;
  comments: any;
  photos: any;
  userData: any = JSON.parse(localStorage.getItem('userData'));
  constructor(private api: ApiService, private router: Router, private aroute: ActivatedRoute, private other: OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.aroute.params.subscribe(res => {
      this.profile(res.id);
      this.postData();
      this.userId = res?.id;
      // this.newsId = res.id;
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

  async likePost(status, post_id) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    let data = {
      post_id: post_id,
      user_id: this.userData.id,
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

  async postData() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    let data = {
      limit: 4,
      start: 0,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id
    }
    this.api.profilePost(data).subscribe(res => {
      this.posts = res;
      loading.dismiss();
      console.log(res,"oooooo");
    })
  }
  async recipeData() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    let data = {
      limit: 4,
      start: 0,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id
    }
    this.api.profileRecipe(data).subscribe(res => {
      this.posts = res;
      loading.dismiss();
      console.log(res);
    })
  }
  async eventData() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    let data = {
      limit: 4,
      start: 0,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id
    }
    this.api.profileEvent(data).subscribe(res => {
      this.posts = res;
      loading.dismiss();
      console.log(res);
    })
  }
  async blogData() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    let data = {
      limit: 4,
      start: 0,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id
    }
    this.api.profileBlog(data).subscribe(res => {
      this.posts = res;
      loading.dismiss();
      console.log(res);
    })
  }
  async photosData(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    let data = {
      limit: 4,
      start: 0,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id
    }
    this.api.profilePhoto(data).subscribe(res => {
      loading.dismiss();
      this.photos = res;
      console.log(res);
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
  async presentLoading(loading) {
    return await loading.present();
  }

  async sendFriendReq(id) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    let data = {
      user_id: JSON.parse(localStorage.getItem('userData'))?.id,
      touserId: id
    }
    this.api.friendReqestSend(data).subscribe(res => {
      loading.dismiss();
      this.profile(this.userId)
      this.other.presentToast('Friend Request sent successful !!','checkmark-circle-outline','success');
      console.log(res);
    },
    err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }
  async friendRequestCancel(id) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    let data = {
      user_id: JSON.parse(localStorage.getItem('userData'))?.id,
      touserId: id
    }
    this.api.friendRequestCancel(data).subscribe(res => {
      loading.dismiss();
      console.log(this.profileData?.users_details)
      this.profile(this.userId)
      this.other.presentToast('Friend Request cancel successful !!','checkmark-circle-outline','success');
      console.log(res);
    },
    err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  async unfriend(id) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    let data = {
      user_id: JSON.parse(localStorage.getItem('userData'))?.id,
      touserId: id
    }
    this.api.unfriend(data).subscribe(res => {
      loading.dismiss();
      console.log(this.profileData?.users_details)
      this.profile(this.userId)
      this.other.presentToast('Unfriend successful !!','checkmark-circle-outline','success');
      console.log(res);
    },
    err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  convert(userData){
    if(userData){
      return JSON.stringify({
        "id": userData.id,
        "name": userData.name,
        "profile_image": userData.profile_image
      })
    }

  }

  protected readonly Env = Env;
}
