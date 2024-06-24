import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  content:any;
  notificationCount:any;

  constructor(private api: ApiService, private other: OtherService,) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.about();
  }

  about(){
    this.api.about().subscribe(res => {
      this.content = res['page_details'][0].page_content;
    },
    err=>{
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

}
