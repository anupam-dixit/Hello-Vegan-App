import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import {EnsureLoggedInGuard} from "../guards/ensureLoggedIn/ensure-logged-in.guard";

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    canActivate:[EnsureLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
