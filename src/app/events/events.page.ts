import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  eventData: any;
  segmentValue: any;
  activeData: any;
  notificationCount:any;

  constructor(private api: ApiService, private other: OtherService) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.events();
  }

  events() {
    this.api.events().subscribe(res => {
      this.eventData = res;
      this.eventData?.event_category.splice(0,0,{
        created_at: "2022-08-05 08:34:00",
        deleted_at: "0",
        id: "-1",
        name: "All",
        tatus: "1",
        updated_at: "2022-08-05 08:34:00"
      });
      this.segmentValue = res['event_category'][0]?.name;
      this.activeData = res['events']
      console.log(res);
    })
  }
  segmentChanged(e) {
    console.log(e.detail.value)
    this.segmentValue = e.detail.value;
    this.activeData = e.detail.value == 'All'?this.eventData['events']:this.eventData['events'].filter(res => res?.category_name === this.segmentValue)
  }

    protected readonly environment = environment;
}
