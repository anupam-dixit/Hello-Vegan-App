import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LangComponent} from "./lang.component";

const routes: Routes = [
  {
    path: '',
    component: LangComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LangRoutingModule {}
