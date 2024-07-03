import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";
declare var $:any
@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  newsData: any;
  activeData: any;
  segmentValue: any;
  notificationCount:any;

  constructor(private api: ApiService, private router: Router, private other: OtherService) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.news();
  }

  news() {
    this.api.news().subscribe(res => {
      this.newsData = res;
      this.newsData?.news_category.splice(0,0,{
        id: "-1",
        name: "All"
      });
      this.segmentValue = res['news_category'][0]?.name;
      this.activeData = res['news']
      console.log(res);
    })
  }
  segmentChanged(e) {
    console.log(e.detail.value)
    this.segmentValue = e.detail.value;
    this.activeData = e.detail.value == 'All'?this.newsData['news']:this.newsData['news'].filter(res => res?.category_name === this.segmentValue)
  }

  protected readonly environment = environment;
}
