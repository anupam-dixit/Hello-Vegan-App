import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {SubscriptionLimiterGuard} from "./guards/subscription-limiter/subscription-limiter.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'search-result',
    loadChildren: () => import('./search-result/search-result.module').then( m => m.SearchResultPageModule)
  },
  {
    path: 'chat-list',
    loadChildren: () => import('./chat-list/chat-list.module').then( m => m.ChatListPageModule)
  },
  {
    path: 'chating/:id/:gid',
    loadChildren: () => import('./chating/chating.module').then( m => m.ChatingPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'recipes-details/:id',
    loadChildren: () => import('./recipes-details/recipes-details.module').then( m => m.RecipesDetailsPageModule)
  },
  {
    path: 'blog-details/:id',
    loadChildren: () => import('./blog-details/blog-details.module').then( m => m.BlogDetailsPageModule)
  },
  {
    path: 'news-details/:id',
    loadChildren: () => import('./news-details/news-details.module').then( m => m.NewsDetailsPageModule)
  },
  {
    path: 'events-details/:id',
    loadChildren: () => import('./events-details/events-details.module').then( m => m.EventsDetailsPageModule)
  },
  {
    path: 'dashboard-details/:id',
    loadChildren: () => import('./dashboard-details/dashboard-details.module').then( m => m.DashboardDetailsPageModule)
  },
  {
    path: 'restaurants-details/:id',
    loadChildren: () => import('./restaurants-details/restaurants-details.module').then( m => m.RestaurantsDetailsPageModule)
  },
  {
    path: 'product-details/:id',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'cook-profile/:id',
    loadChildren: () => import('./cook-profile/cook-profile.module').then( m => m.CookProfilePageModule)
  },
  {
    path: 'add-blog',
    canActivate:[SubscriptionLimiterGuard],
    loadChildren: () => import('./add-blog/add-blog.module').then( m => m.AddBlogPageModule)
  },
  {
    path: 'add-event',
    loadChildren: () => import('./add-event/add-event.module').then( m => m.AddEventPageModule)
  },
  {
    path: 'add-recipe',
    canActivate:[SubscriptionLimiterGuard],
    loadChildren: () => import('./add-recipe/add-recipe.module').then( m => m.AddRecipePageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'my-subscription',
    loadChildren: () => import('./my-subscription/my-subscription.module').then( m => m.MySubscriptionPageModule)
  },
  {
    path: 'limit-exceed',
    loadChildren: () => import('./error/limit-exceed/limit-exceed.module').then( m => m.LimitExceedPageModule)
  },
  {
    path: 'chat-group-create',
    loadChildren: () => import('./chat/group/chat-group-create/chat-group-create.module').then( m => m.ChatGroupCreatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
