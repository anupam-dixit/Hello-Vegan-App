import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-friendslist',
  templateUrl: './friendslist.page.html',
  styleUrls: ['./friendslist.page.scss'],
})
export class FriendslistPage implements OnInit {

  notificationCount: any;
  friendlist:any;
  constructor(private api:ApiService, private router:Router, private other:OtherService, private aroute: ActivatedRoute,) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.aroute.params.subscribe(res => {
      this.userFriendList(res.id)
    })

  }

  userFriendList(id){
    this.api.userFriendList(id).subscribe(res=>{
      this.friendlist = res;
      console.log(res,"=00");
    })
  }

    protected readonly environment = environment;
}
