import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LimitExceedPageRoutingModule } from './limit-exceed-routing.module';

import { LimitExceedPage } from './limit-exceed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LimitExceedPageRoutingModule
  ],
  declarations: [LimitExceedPage]
})
export class LimitExceedPageModule {}
