import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  profileData: any;
  form = {
    name:'',
    last_name:'',
    email:'',
    mobile_no:'',
    address:'',
    country:'',
    state:'',
    city:'',
    pin_code:'',
    date_of_birth:'',
    description:'',
    profile_picture:'',
    background_picture:''
  }
  notificationCount:any;

  constructor(private api:ApiService, private aroute: ActivatedRoute, private router:Router, private other:OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.profile(JSON.parse(localStorage.getItem('userData'))?.id);
  }

  profile(id){
    const login_user_id = JSON.parse(localStorage.getItem('userData'))?.id
    this.api.profile(id, login_user_id).subscribe(res=>{
      this.profileData = res;
      this.form = res['users_details'];
      delete this.form['id']
      console.log(res);
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  async EditProfile() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.form["user_id"] = JSON.parse(localStorage.getItem('userData'))?.id,
    this.api.profileUpdate(this.form).subscribe(res => {
      loading.dismiss();
      this.other.presentToast('Profile edited successful !!', 'checkmark-circle-outline', 'success');
      history.back();
    },
      err => {
        loading.dismiss();
        this.other.presentToast('Something went Wrong!!', 'information-circle-outline', 'danger');
      })
  }

}
