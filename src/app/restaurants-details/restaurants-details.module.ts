import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantsDetailsPageRoutingModule } from './restaurants-details-routing.module';

import { RestaurantsDetailsPage } from './restaurants-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantsDetailsPageRoutingModule
  ],
  declarations: [RestaurantsDetailsPage]
})
export class RestaurantsDetailsPageModule {}
