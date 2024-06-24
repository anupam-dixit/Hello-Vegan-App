import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardDetailsPageRoutingModule } from './dashboard-details-routing.module';

import { DashboardDetailsPage } from './dashboard-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardDetailsPageRoutingModule
  ],
  declarations: [DashboardDetailsPage]
})
export class DashboardDetailsPageModule {}
