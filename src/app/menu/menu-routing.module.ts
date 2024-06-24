import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import {SubscriptionLimiterGuard} from "../guards/subscription-limiter/subscription-limiter.guard";

const routes: Routes = [
   {
    path: '',
    component: MenuPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
      },
      {
        path: 'profile/:id',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('../news/news.module').then( m => m.NewsPageModule)
      },
      {
        path: 'product',
        loadChildren: () => import('../product/product.module').then( m => m.ProductPageModule)
      },
      {
        path: 'recipes',
        loadChildren: () => import('../recipes/recipes.module').then( m => m.RecipesPageModule)
      },
      {
        path: 'restaurants',
        loadChildren: () => import('../restaurants/restaurants.module').then( m => m.RestaurantsPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: 'public-profile/:id',
        loadChildren: () => import('../public-profile/public-profile.module').then( m => m.PublicProfilePageModule)
      },
      {
        path: 'cook',
        loadChildren: () => import('../cook/cook.module').then( m => m.CookPageModule)
      },
      {
        path: 'friendrequests',
        loadChildren: () => import('../friendrequests/friendrequests.module').then( m => m.FriendrequestsPageModule)
      },
      {
        path: 'friendslist/:id',
        loadChildren: () => import('../friendslist/friendslist.module').then( m => m.FriendslistPageModule)
      },
      {
        path: 'share-your-thoughts',
        canActivate:[SubscriptionLimiterGuard],
        loadChildren: () => import('../share-your-thoughts/share-your-thoughts.module').then( m => m.ShareYourThoughtsPageModule)
      },
      {
        path: 'cookies',
        loadChildren: () => import('../cookies/cookies.module').then( m => m.CookiesPageModule)
      },
      {
        path: 'privacy',
        loadChildren: () => import('../privacy/privacy.module').then( m => m.PrivacyPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then( m => m.ContactPageModule)
      },
      {
        path: 'advertising',
        loadChildren: () => import('../advertising/advertising.module').then( m => m.AdvertisingPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
