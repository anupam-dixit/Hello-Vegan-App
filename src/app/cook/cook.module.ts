import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CookPageRoutingModule } from './cook-routing.module';

import { CookPage } from './cook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CookPageRoutingModule
  ],
  declarations: [CookPage]
})
export class CookPageModule {}
