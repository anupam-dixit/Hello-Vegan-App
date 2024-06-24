import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api/api.service";
import {Router} from "@angular/router";
import {myLib} from "../../../helpers/myLib";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-limit-exceed',
  templateUrl: './limit-exceed.page.html',
  styleUrls: ['./limit-exceed.page.scss'],
})
export class LimitExceedPage implements OnInit {
  apiData
  userData:any = JSON.parse(localStorage.getItem('userData') || '{}');

  constructor(private api: ApiService,private navCtrl: NavController) {
    this.api.getMySubscription({user_id: myLib.auth.get().id}).pipe().subscribe(d=>{
      this.apiData=d
    })
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }
}
