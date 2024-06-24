import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CookProfilePageRoutingModule } from './cook-profile-routing.module';

import { CookProfilePage } from './cook-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CookProfilePageRoutingModule
  ],
  declarations: [CookProfilePage]
})
export class CookProfilePageModule {}
