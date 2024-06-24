import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  userData:any = JSON.parse(localStorage.getItem('userData') || '{}');

  constructor(private router:Router) { }

  ngOnInit() {
    // this.other.notificationCount.subscribe(res => {
    //   this.notificationCount = res;
    // })
    // A $( document ).ready() block.
    $( document ).ready(function() {
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

  protected readonly environment = environment;
}
