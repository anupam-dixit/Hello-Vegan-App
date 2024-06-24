import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRecipePageRoutingModule } from './add-recipe-routing.module';

import { AddRecipePage } from './add-recipe.page';
import { QuillModule } from 'ngx-quill';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRecipePageRoutingModule,
    QuillModule
  ],
  providers:[
    Camera,
    File
  ],
  declarations: [AddRecipePage]
})
export class AddRecipePageModule {}
