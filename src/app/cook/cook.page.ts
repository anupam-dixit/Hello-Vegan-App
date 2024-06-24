import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import {Env} from "../../environments/env";

@Component({
  selector: 'app-cook',
  templateUrl: './cook.page.html',
  styleUrls: ['./cook.page.scss'],
})
export class CookPage implements OnInit {

  cookData:any;
  notificationCount:any;
  constructor(private api:ApiService, private other:OtherService) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.cook()
  }

  cook(){
    this.api.cook().subscribe(res=>{
      this.cookData = res;
      console.log(res,"000");
    })
  }


  protected readonly Env = Env;
}
