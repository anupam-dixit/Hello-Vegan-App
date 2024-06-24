import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CookPage } from './cook.page';

const routes: Routes = [
  {
    path: '',
    component: CookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookPageRoutingModule {}
