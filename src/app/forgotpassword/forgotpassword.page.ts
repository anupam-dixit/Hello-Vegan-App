import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  form = {
    email:'',
  }
// soni.pradeep27@gmail.com
  constructor(private api:ApiService, private router:Router, private other:OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async sendForgotPasswordLink(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.api.sendForgotPasswordLink(this.form).subscribe(res=>{
      loading.dismiss();
        this.other.presentToast('Link sent to your email !!','checkmark-circle-outline','success');
      this.router.navigate(['/login'],{replaceUrl:true});
    },err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
