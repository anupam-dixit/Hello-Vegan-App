import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-cook-profile',
  templateUrl: './cook-profile.page.html',
  styleUrls: ['./cook-profile.page.scss'],
})
export class CookProfilePage implements OnInit {

  notificationCount:any;
  cookData:any;
  cookId:any;
  constructor(private api:ApiService, private router:Router, private aroute:ActivatedRoute , private other:OtherService) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.aroute.params.subscribe(res => {
      this.getCookData(res.id);
      this.cookId = res.id;
    })
  }

  getCookData(id){
    const data = {
      id: id
    }
    this.api.cookProfileById(data).subscribe(res=>{
      this.cookData = res;
      console.log(res,"000");
    })
  }

  protected readonly environment = environment;
}
