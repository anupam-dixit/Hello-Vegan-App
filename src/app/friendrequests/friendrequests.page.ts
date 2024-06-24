import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Env} from "../../environments/env";

@Component({
  selector: 'app-friendrequests',
  templateUrl: './friendrequests.page.html',
  styleUrls: ['./friendrequests.page.scss'],
})
export class FriendrequestsPage implements OnInit {

  notificationCount: any;
  requestlist:any;
  constructor(private api:ApiService, private router:Router, private other:OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.userFriendList()
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  userFriendList(){
    const id = parseInt(JSON.parse(localStorage.getItem('userData'))?.id)
    this.api.friendReqestList(id).subscribe(res=>{
      this.requestlist = res;
      console.log(res,"ppp")
    })
  }

  async friendReqestSend(id){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    const data = {
      user_id: parseInt(JSON.parse(localStorage.getItem('userData'))?.id),
      fromuserId: id
    }
    this.api.friendRequestConfirm(data).subscribe(res=>{
      loading.dismiss();
      this.userFriendList();
    })
  }

  async friendRequestDelete(id){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    const data = {
      user_id: parseInt(JSON.parse(localStorage.getItem('userData'))?.id),
      fromuserId: id
    }
    this.api.friendRequestDelete(data).subscribe(res=>{
      loading.dismiss();
      this.userFriendList();
    })
  }

  protected readonly Env = Env;
}
