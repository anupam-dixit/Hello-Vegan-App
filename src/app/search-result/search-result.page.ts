import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router } from '@angular/router';
import {Env} from "../../environments/env";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage implements OnInit {
  searchData: any;
  constructor(private api: ApiService, private router: Router, private other: OtherService) { }

  ngOnInit() {}

  getSearchData(value) {
    let data = {
      term: value
    }
    this.api.liveSearch(data).subscribe(res => {
      this.searchData = res;
      console.log(this.searchData)
    })
  }

  getSearchContent(event){
    this.getSearchData(event.target.value)
  }

  protected readonly Env = Env;
}
