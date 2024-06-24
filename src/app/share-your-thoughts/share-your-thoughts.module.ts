import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareYourThoughtsPageRoutingModule } from './share-your-thoughts-routing.module';

import { ShareYourThoughtsPage } from './share-your-thoughts.page';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareYourThoughtsPageRoutingModule,
    QuillModule
  ],
  declarations: [ShareYourThoughtsPage]
})
export class ShareYourThoughtsPageModule {}
