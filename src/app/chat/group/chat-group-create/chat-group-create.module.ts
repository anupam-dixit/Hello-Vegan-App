import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatGroupCreatePageRoutingModule } from './chat-group-create-routing.module';

import { ChatGroupCreatePage } from './chat-group-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatGroupCreatePageRoutingModule
  ],
  declarations: [ChatGroupCreatePage]
})
export class ChatGroupCreatePageModule {}
