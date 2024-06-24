import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Browser } from '@capacitor/browser';
import {Env} from "../../environments/env";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  restaurantData:any;
  notificationCount:any;
  constructor(private api:ApiService, private other:OtherService) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.restaurant()
  }

  async menu(url){
    const browser = await Browser.open({url:Env.BasePoint+url});
  }

  restaurant(){
    this.api.restaurant().subscribe(res=>{
      this.restaurantData = res;
      console.log(res);
    })
  }

  protected readonly Env = Env;
}
