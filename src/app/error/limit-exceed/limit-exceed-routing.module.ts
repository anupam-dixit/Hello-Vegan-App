import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LimitExceedPage } from './limit-exceed.page';

const routes: Routes = [
  {
    path: '',
    component: LimitExceedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LimitExceedPageRoutingModule {}
