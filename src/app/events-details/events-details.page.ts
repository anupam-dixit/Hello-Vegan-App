import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Env} from "../../environments/env";
import {endpoints} from "../../environments/endpoints";
import {myLib} from "../../helpers/myLib";

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.page.html',
  styleUrls: ['./events-details.page.scss'],
})
export class EventsDetailsPage implements OnInit {

  eventData:any;
  notificationCount:any;
  comments:any;
  eventId:any;
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
      this.eventId = res.id;
      this.eventDetails(res.id);
      this.eventShowAllComment(res?.id)
      console.log(res);
    })
  }

  eventDetails(id){
    const data = {
      post_id: id,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id
    }
    this.api.eventDetails(data).subscribe(res=>{
      this.eventData = res;
      console.log(res,"detail");
    })
  }

  eventShowAllComment(id){
    this.api.eventShowAllComment(id).subscribe(res=>{
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
    this.form.post_id = this.eventId;
    this.api.eventInsertComment(this.form).subscribe(res => {
      this.eventShowAllComment(this.eventId);
      loading.dismiss();
      this.other.presentToast('Comment posted successful !!','checkmark-circle-outline','success');
      this.form = {
        post_id: null,
        user_id: null,
        message: null
      }
    },
    err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  async interstedEvent(status){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    const data = {
      event_id: this.eventId,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id,
      status: status
    }
    this.api.eventIntrested(data).subscribe(res => {
      this.eventDetails(this.eventId);
      loading.dismiss();
    },
    err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  async eventInsertNotIntersted(status){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    const data = {
      event_id: this.eventId,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id
    }
    this.api.eventInsertNotIntersted(data).subscribe(res => {
      this.eventDetails(this.eventId);
      loading.dismiss();
    },
    err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  async report(target_type: string, target_id: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.api.post(endpoints.report.create,{
      target_type:target_type,target_id:target_id,created_by:myLib.auth.get()?.id
    }).subscribe((d:any)=>{
      this.other.presentToast(d?.message, 'information-circle-outline', d?.status?"success":"danger");
      loading.dismiss()
    })
  }

  protected readonly Env = Env;
}
