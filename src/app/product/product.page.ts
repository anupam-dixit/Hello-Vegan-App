import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import {Env} from "../../environments/env";

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  productData:any;
  notificationCount:any;

  constructor(private api:ApiService, private other:OtherService) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.product()
  }

  product(){
    const data = {
      start:0,
      limit:7
    }
    this.api.product(data).subscribe(res=>{
      this.productData = res;
      console.log(res);
    })
  }

  protected readonly Env = Env;
}
