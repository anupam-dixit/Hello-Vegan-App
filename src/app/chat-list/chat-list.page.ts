import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Env} from "../../environments/env";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

  chatData:any;
  groupChatData:any;
  groupChatDataSearch:any;
  chatDataSearch:any;

  constructor(private api:ApiService, private router:Router, private other:OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getChatUsers();
    this.getChatGroups();
  }

  async getChatUsers(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.api.getChatUsers({userId:JSON.parse(localStorage.getItem('userData')).id}).subscribe(res=>{
      console.log(res);
      loading.dismiss();
      this.chatData = res['chatusers'];
      this.chatDataSearch = this.chatData;
      // localStorage.setItem('userData',JSON.stringify(res['data']))
      // this.router.navigate(['/menu/dashboard'],{replaceUrl:true});
    },err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  search(e){
    console.log(e.detail.value)
    if(e.detail.value){
      this.chatDataSearch = this.chatData.filter(res=>res.name.toLowerCase().includes(e.detail.value));
      this.groupChatDataSearch = this.groupChatData.filter(res=>res.group_name.toLowerCase().includes(e.detail.value));
    }else{
      this.chatDataSearch = this.chatData;
      this.groupChatDataSearch = this.groupChatData;
    }
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  async getChatGroups(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.api.getChatGroups({userId:JSON.parse(localStorage.getItem('userData')).id}).subscribe(res=>{
      console.log(res);
      loading.dismiss();
      this.groupChatData = res['chatgroups'];
      this.groupChatDataSearch = this.groupChatData;
      // localStorage.setItem('userData',JSON.stringify(res['data']))
      // this.router.navigate(['/menu/dashboard'],{replaceUrl:true});
    },err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  convert(data){
    return JSON.stringify(data);
  }

  protected readonly Env = Env;
}

