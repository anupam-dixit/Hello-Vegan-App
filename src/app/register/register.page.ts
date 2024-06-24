import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { OtherService } from '../service/other/other.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form = { 
    name:'',
    last_name:'',
    email:'',
    mobile_no:'',
    password:'',
    confirm_password:'',
    countrycode:'91',
  }
  countryCodeList:any;

  constructor(private api:ApiService, private router:Router, private other:OtherService) { }

  ngOnInit() {
    this.getCountryCode();
  }

  getCountryCode(){
    this.api.countryCode().subscribe(res=>{
      console.log(res,"--00")
      this.countryCodeList = res;
    })
  }

  signup(pass){
    if(this.form.password === this.form.confirm_password){
      this.api.signup(this.form).subscribe(res=>{
        this.other.presentToast('Registration successful !!','checkmark-circle-outline','success');
        this.router.navigate(['/login']);
      },err=>{
        this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
      })
    }else{
      pass.controls.confirm_password.status = "INVALID";
    }
  }

}
