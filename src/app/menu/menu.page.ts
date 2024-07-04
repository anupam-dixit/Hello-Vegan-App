import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";
import {ApiService} from "../service/api/api.service";
import {LoadingController} from "@ionic/angular";
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  userData:any = JSON.parse(localStorage.getItem('userData') || '{}');
  eulaData:any

  constructor(private router:Router,private api:ApiService,private loadingCtrl: LoadingController) { }

  ngOnInit() {
    // this.other.notificationCount.subscribe(res => {
    //   this.notificationCount = res;
    // })
    // A $( document ).ready() block.
    const ctx=this
    $( document ).ready(function() {
      if (!localStorage.getItem("eula")){
        ctx.eula()
      }

      $("#basicExampleModal").on('hide.bs.modal', function(){
        // $(".skiptranslate").css('visibility','hidden')
      });
      $("#basicExampleModal").on('show.bs.modal', function(){
        // $(".skiptranslate").css('visibility','')
      });
      setTimeout(function () {
        new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
        var i=0
        $(".skiptranslate").each(function(){
          if (i===0){
            $(this).css('visibility','hidden !important')
          }
        })

      },200)
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  protected readonly $ = $;

  launchModal() {
    $('#basicExampleModal').modal('show')
  }
  async eula(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    this.api.eula().subscribe(res => {
        loading.dismiss();
        this.eulaData = res['page_details'][0].page_content;
        $("#eulaModal").modal('show')
      },
      err=>{
        loading.dismiss();
      })
  }

  protected readonly environment = environment;

  accept() {
    localStorage.setItem("eula",new Date().toString())
    $('#eulaModal').modal('hide')
  }
}
