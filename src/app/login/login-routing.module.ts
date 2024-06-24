import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import {EnsureNotLoggedInGuard} from "../guards/ensureNotLoggedIn/ensure-not-logged-in.guard";

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canActivate:[EnsureNotLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
