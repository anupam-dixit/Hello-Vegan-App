import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Env} from "../../environments/env";

@Component({
  selector: 'app-chating',
  templateUrl: './chating.page.html',
  styleUrls: ['./chating.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatingPage implements OnInit {

  chatData:any;
  msg:any;
  data:any;
  chatInterval:any;
  id:any;
  gid:any;
  @ViewChild('content') private content: any;
  first:boolean = true;

  constructor(private api:ApiService, private router:Router, private aroute: ActivatedRoute, private other:OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.aroute.params.subscribe(res => {
      if(res.gid!='0'){
        this.gid = res.gid;
        this.chatInterval = setInterval(()=>{
          this.groupMessageSendReceiveAll(res.gid);
        },2000)
      }else{
        console.log(res.id)
        this.id = res.id;
        this.chatInterval = setInterval(()=>{
          this.messageSendReceiveAll(res.id);
        },2000)
      }
    })
    console.log(this.id,this.gid)
    this.aroute.queryParams.subscribe(params => {
      this.data = JSON.parse(params.prop);
      console.log(this.data);
    })
  }

  ionViewDidEnter(){
    console.log(this.content)
    this.scrollToBottomOnInit();
  }

  scrollToBottomOnInit() {
    this.content.scrollToBottom(400);
  }

  async messageSendReceiveAll(id){
    this.api.messageSendReceiveAll({touserId:id,userId:JSON.parse(localStorage.getItem('userData')).id}).subscribe(res=>{
      this.chatData = res['result'];
      if(this.first){
        this.first = false;
        this.scrollToBottomOnInit();
      }
    },err=>{
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  async groupMessageSendReceiveAll(gid){
    this.api.groupMessageSendReceiveAll({groupId:gid,userId:JSON.parse(localStorage.getItem('userData')).id}).subscribe(res=>{
      this.chatData = res['result'];
      if(this.first){
        this.first = false;
        this.scrollToBottomOnInit();
      }
    },err=>{
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  async messageSend(){
    this.first = true;
    let data = null;
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    console.log(this.id,this.gid)
    if(this.gid){
      data = {groupId:this.gid,userId:JSON.parse(localStorage.getItem('userData')).id, msg:this.msg};
      this.api.groupMessageSend(data).subscribe(res=>{
        console.log(res);
        this.msg = '';
        loading.dismiss();
      },err=>{
        loading.dismiss();
        this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
      })
    }else{
      data = {touserId:this.id,userId:JSON.parse(localStorage.getItem('userData')).id, msg:this.msg};
      this.api.messageSend(data).subscribe(res=>{
        console.log(res);
        this.msg = '';
        loading.dismiss();
      },err=>{
        loading.dismiss();
        this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
      })
    }
    this.scrollToBottomOnInit();
  }

  ngOnDestroy(){
    clearInterval(this.chatInterval);
  }

  protected readonly Env = Env;
}
