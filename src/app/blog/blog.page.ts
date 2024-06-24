import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {

  blogData:any;
  segmentValue:any;
  activeData:any;
  notificationCount:any;

  constructor(private api:ApiService, private router:Router, private other:OtherService) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.blog();
  }

  blog(bool?){
    const data = {
      start: 0,
      limit: 50
    }
    this.api.blog(data).subscribe(res=>{
      this.blogData = res;
      this.blogData?.blog_category.splice(0,0,{
        created_at: "2022-10-11 02:43:00",
        deleted_at: "0",
        id: "-1",
        name: "All",
        status: "1",
        updated_at: "2022-10-11 02:43:00"
      });
      this.segmentValue = this.segmentValue?this.segmentValue:res['blog_category'][0]?.name;
      this.activeData = res['blogs']
      if (bool) {
        bool.target.complete()
      }
    })
  }

  segmentChanged(e){
    this.segmentValue = e.detail.value;
    this.activeData = e.detail.value == '-1'?this.blogData['blogs']:this.blogData['blogs'].filter(res => res?.post_category_id === this.segmentValue)
  }

  protected readonly environment = environment;
}
