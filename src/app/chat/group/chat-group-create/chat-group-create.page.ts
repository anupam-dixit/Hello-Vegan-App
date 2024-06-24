import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../service/api/api.service";
import {Router} from "@angular/router";
import {OtherService} from "../../../service/other/other.service";
import {LoadingController} from "@ionic/angular";
import {endpoints} from "../../../../environments/endpoints";

@Component({
  selector: 'app-chat-group-create',
  templateUrl: './chat-group-create.page.html',
  styleUrls: ['./chat-group-create.page.scss'],
})
export class ChatGroupCreatePage implements OnInit {

  constructor(private api:ApiService, private router:Router, private other:OtherService, private loadingCtrl: LoadingController) { }
  allUsers:any=null
  selectedArray :any = [];
  groupName:any

  ngOnInit() {
    this.getChatUsers()
  }
  async presentLoading(loading) {
    return await loading.present();
  }
  async getChatUsers(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.api.getChatUsers({userId:JSON.parse(localStorage.getItem('userData')).id}).subscribe((res:any)=>{
      this.allUsers=res['chatusers']
      // localStorage.setItem('userData',JSON.stringify(res['data']))
      // this.router.navigate(['/menu/dashboard'],{replaceUrl:true});
      loading.dismiss();
    },err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  selectMember(data, checked: boolean){
    if (checked == true) {
      this.selectedArray.push(data?.id);
    } else {
      let newArray = this.selectedArray.filter(function(el) {
        return el !== data.id;
      });
      this.selectedArray = newArray;
    }
    console.log(this.selectedArray);
  }
  submit(){
    if (!this.groupName){
      return this.other.presentToast("Provide group name",'information-circle-outline','warning');
    }
    if (this.selectedArray.length<2){
      return this.other.presentToast("At least two people required",'information-circle-outline','warning');
    }

    this.api.post(endpoints.group.create,{
      userId:JSON.parse(localStorage.getItem('userData'))?.id,
      groupName:this.groupName,groupMember:this.selectedArray.join(",")
    }).subscribe(d=>{
      this.other.presentToast(d['msg'],'information-circle-outline','success');
      this.router.navigateByUrl('/chat-list')
    })
  }
}
