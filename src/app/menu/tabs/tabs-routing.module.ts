import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../../events/events.module').then( m => m.EventsPageModule)
      },
      {
        path: 'recommendation',
        loadChildren: () => import('../../recommendation/recommendation.module').then( m => m.RecommendationPageModule)
      },
      {
        path: 'recipes',
        loadChildren: () => import('../../recipes/recipes.module').then( m => m.RecipesPageModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('../../blog/blog.module').then( m => m.BlogPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
