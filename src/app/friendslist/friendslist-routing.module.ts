import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendslistPage } from './friendslist.page';

const routes: Routes = [
  {
    path: '',
    component: FriendslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendslistPageRoutingModule {}
