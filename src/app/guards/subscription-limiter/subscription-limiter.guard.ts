import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from "../../service/api/api.service";
import {myLib} from "../../../helpers/myLib";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionLimiterGuard implements CanActivate {
  constructor(private api: ApiService,private router: Router) {
  }
  mySub
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.api.getMySubscription({user_id: myLib.auth.get().id}).pipe().subscribe(d=>{
      this.mySub=d
      if (state.url.includes('share-your-thoughts')){
        if (this.mySub.subscription.data.post<this.mySub.usage.post){
          this.router.navigate(['/limit-exceed'], { replaceUrl: true });
        }
      }
      if (state.url.includes('add-blog')){
        if (this.mySub.subscription.data.blog<this.mySub.usage.blog){
          this.router.navigate(['/limit-exceed'], { replaceUrl: true });
        }
      }
      if (state.url.includes('add-recipe')){
        if (this.mySub.subscription.data.recipe<this.mySub.usage.recipe){
          this.router.navigate(['/limit-exceed'], { replaceUrl: true });
        }
      }
    })
    return true;
  }

}
