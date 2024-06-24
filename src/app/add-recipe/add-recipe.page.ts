import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { Router } from '@angular/router';
import { OtherService } from '../service/other/other.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage implements OnInit {

  form = {
    post_category_id: null,
    title: null,
    detail: null,
    user_id: null,
    location: null,
    tags: null,
    steps: null,
    ingredients: null,
    cooking_time: null,
    image:null,
    videofile:null,
    galleryimage: [],
  }
  notificationCount:any
  constructor(private file:File, private api: ApiService, private router: Router, private other: OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.other.notificationCount.subscribe(res=>{
      this.notificationCount = res;
    })
  }
  async presentLoading(loading) {
    return await loading.present();
  }
  async AddRecipe() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.form.user_id = JSON.parse(localStorage.getItem('userData'))?.id
    let formData=new FormData()
    for (const key in this.form) {
      if (key!=='galleryimage'){
        if (this.form.hasOwnProperty(key)) {
          if (Array.isArray(this.form[key])) {
            this.form[key].forEach((item, index) => {
              formData.append(`${key}[${index}]`, item);
            });
          } else {
            formData.append(key, this.form[key]);
          }
        }
      } else {
        Array.from(this.form.galleryimage).forEach((file, index) => {
          formData.append('galleryimage[]', file, file.name);
        });
      }

    }
    this.api.addRecipe(formData).subscribe(res => {
      loading.dismiss();
      this.other.presentToast('Recipe Added successful !!','checkmark-circle-outline','success');
      history.back();
    },
    err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  // async chooseImage() {
  //   // this.captureImage(this.camera.PictureSourceType.SAVEDPHOTOALBUM, async obj => {
  //   //   this.form.image = obj.imagedata;
  //   // })
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     resultType: CameraResultType.Base64
  //   });
  //   this.form.image = image
  // }
  async chooseImage($event: any) {
    this.form.image=$event.target.files[0]
  }

  async chooseMultiImage($event: any) {
    // this.captureImage(this.camera.PictureSourceType.SAVEDPHOTOALBUM, async obj => {
    //   this.form.galleryimage.push(obj.imagedata);
    // })
    this.form.galleryimage=$event.target.files
  }

  removeImage(i){
    this.form.galleryimage.splice(i,1);
    console.log(this.form.galleryimage)
  }

  captureImage(stype: number, callback) {
    // const options: CameraOptions = {
    //   quality: 90,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   sourceType: stype,
    //   allowEdit: false,
    //   correctOrientation: true
    // }
    // this.camera.getPicture(options).then((imageData) => {
    //   let base64Image = `data:image/jpeg;base64,${imageData}`;
    //   let object;
    //   console.log(base64Image)
    //   if (stype == this.camera.PictureSourceType.CAMERA) {
    //     object = {
    //       "isCamera": true,
    //       "imagedata": base64Image
    //     }
    //     callback(object);
    //   }
    //   else {
    //     object = {
    //       "isCamera": false,
    //       "imagedata": base64Image
    //     }
    //     callback(object);
    //
    //   }
    // }, (err) => {
    //   // Handle error
    // });
  }

  async chooseVideo($event: any){
    // this.captureVideo(this.camera.PictureSourceType.SAVEDPHOTOALBUM, async obj =>{
    //   this.form.videofile = obj.imagedata;
    // })
    this.form.videofile=$event.target.files[0]
  }

  captureVideo(stype: number, callback) {
    // const options: CameraOptions = {
    //   quality: 90,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   mediaType: this.camera.MediaType.VIDEO,
    //   sourceType: stype,
    // }
    // this.camera.getPicture(options).then(async (videoUrl) => {
    //   // let base64Image = `data:image/jpeg;base64,${imageData}`;
    //   let object;
    //   var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
    //   var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);
    //
    //   dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
    //
    //   try {
    //     var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
    //     var retrievedFile = await this.file.getFile(dirUrl, filename, {});
    //
    //   } catch(err) {
    //     console.log('error',err);
    //   }
    //   console.log(videoUrl,filename,dirpath, retrievedFile)
    //   if (stype == this.camera.PictureSourceType.CAMERA) {
    //     object = {
    //       "isCamera": true,
    //       "imagedata": retrievedFile
    //     }
    //     callback(object);
    //   }
    //   else {
    //     object = {
    //       "isCamera": false,
    //       "imagedata": retrievedFile
    //     }
    //     callback(object);
    //
    //   }
    //  }, (err) => {
    //   // Handle error
    //  });
  }

  onReady({ editor }) {
    this.form['detail'] = editor.getData();
  }

}
