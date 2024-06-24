import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBlogPageRoutingModule } from './add-blog-routing.module';

import { AddBlogPage } from './add-blog.page';
import { QuillModule } from 'ngx-quill';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBlogPageRoutingModule,
    QuillModule
  ],
  providers:[
    Camera,
    File
  ],
  declarations: [AddBlogPage]
})
export class AddBlogPageModule {}
