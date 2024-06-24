import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { LoadingController } from '@ionic/angular';
import { OtherService } from '../service/other/other.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  notificationCount:any;
  form = {
    name : '',
    email : '',
    mobile : '',
    country : '',
    message : ''
  }
  countryData:any;

  constructor(private api:ApiService,private loadingCtrl: LoadingController, private other:OtherService) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
    this.countryCode();
  }

  async countryCode(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.api.countryCode().subscribe(res => {
      loading.dismiss();
      this.countryData = res;
      console.log(this.countryData?.countries)
    },
    err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  async contact(f){
    const loading = await this.loadingCtrl.create({
      message: 'Sending Message...',
    });
    this.presentLoading(loading);
    this.api.contactInsert(this.form).subscribe(res => {
      loading.dismiss();
      f.reset();
      f.submitted = false;
      this.form = {
        name : '',
        email : '',
        mobile : '',
        country : '',
        message : ''
      }
      this.other.presentToast('Message sent successfull !!','checkmark-circle-outline','success');
    },
    err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

}
