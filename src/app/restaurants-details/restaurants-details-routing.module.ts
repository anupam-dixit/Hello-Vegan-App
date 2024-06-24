import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantsDetailsPage } from './restaurants-details.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantsDetailsPageRoutingModule {}
