import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import {environment} from "../../environments/environment";
import {Env} from "../../environments/env";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  recipeData:any;
  notificationCount:any;
  constructor(private api:ApiService, private router:Router, private aroute:ActivatedRoute , private other:OtherService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.recipes()
  }

  recipes(){
    this.api.recipes().subscribe(res=>{
      this.recipeData = res;
      console.log(res);
    })
  }

  protected readonly environment = environment;
  protected readonly Env = Env;
}
