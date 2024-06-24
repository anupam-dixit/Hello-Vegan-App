import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatGroupCreatePage } from './chat-group-create.page';

const routes: Routes = [
  {
    path: '',
    component: ChatGroupCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatGroupCreatePageRoutingModule {}
