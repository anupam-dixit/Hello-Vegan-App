import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selectedTab:String = '';

  constructor() { }

  ngOnInit() {
  }

  test(e:any){
    console.log(e);
    this.selectedTab = e.tab
  }

}
