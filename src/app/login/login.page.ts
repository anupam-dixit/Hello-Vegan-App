
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = {
    email:'',
    password:''
  }

  constructor(private api:ApiService, private router:Router, private other:OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {

  }

  async login(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.api.login(this.form).subscribe((res:any)=>{
      console.log(res);
      loading.dismiss();
      if(res['responce']){
        localStorage.setItem('userData',JSON.stringify(res['data']))
        this.router.navigate(['/menu/dashboard'],{replaceUrl:true});
      }else{
        this.other.presentToast(res['error'],'information-circle-outline','danger');
      }
    },err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  async presentLoading(loading:any) {
    return await loading.present();
  }

}
