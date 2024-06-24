import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareYourThoughtsPage } from './share-your-thoughts.page';

const routes: Routes = [
  {
    path: '',
    component: ShareYourThoughtsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareYourThoughtsPageRoutingModule {}
