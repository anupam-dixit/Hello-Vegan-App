import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LangRoutingModule } from './lang-routing.module';

import { LangComponent } from './lang.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LangRoutingModule
  ],
  declarations: [LangComponent]
})
export class LangModule {}
