import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { Router } from '@angular/router';
import { OtherService } from '../service/other/other.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import {environment} from "../../environments/environment";
import {myLib} from "../../helpers/myLib";

@Component({
  selector: 'app-share-your-thoughts',
  templateUrl: './share-your-thoughts.page.html',
  styleUrls: ['./share-your-thoughts.page.scss'],
})
export class ShareYourThoughtsPage implements OnInit {
  file=null
  form = {
    create_post_content: null,
    user_id: null,
    create_post_image: null,
    file_extension: null
  }
  targetFile:any
  profilePhoto = JSON.parse(localStorage.getItem('userData')).profile_image;
  mySub=null
  constructor(private api: ApiService, private router: Router, private other: OtherService, private actionSheetController: ActionSheetController, private loadingCtrl: LoadingController) {
    // this.api.getMySubscription({user_id: myLib.auth.get().id}).pipe().subscribe(d=>{
    //   this.mySub=d
    //   if (this.mySub.subscription.data.post>this.mySub.usage.post){
    //   } else {
    //     this.router.navigateByUrl('/limit-exceed')
    //   }
    // })
  }

  ngOnInit() {
  }

  async addPost() {

    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    if (this.form['create_post_content'] != null || this.form['create_post_image'] != null) {

      let formData=new FormData()
      formData.append("create_post_content",this.form.create_post_content)
      formData.append("user_id","26")
      formData.append("create_post_image",this.form.create_post_image)
      formData.append("file_extension",this.form.file_extension)

      this.api.dashboardAddPost(formData).subscribe(res => {
        loading.dismiss();
        this.other.presentToast('Post successful !!', 'checkmark-circle-outline', 'success');
        history.back()
      }, err => {
        loading.dismiss();
        this.other.presentToast('Something went Wrong!!', 'information-circle-outline', 'danger');
      })
    }
    else{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!', 'information-circle-outline', 'danger');
    }
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  // async chooseImage() {
  //   this.presentCameraActionSheet(async obj => {
  //     this.form.create_post_image = obj.imagedata;
  //   })
  // }

  // async presentCameraActionSheet(callback) {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Albums',
  //     buttons: [{
  //       text: 'Camera',
  //       icon: 'camera',
  //       handler: () => {
  //         this.captureImage(this.camera.PictureSourceType.CAMERA, callback)
  //       }
  //     }, {
  //       text: 'Library',
  //       icon: 'image',
  //       handler: () => {
  //         console.log('Play clicked');
  //         this.captureImage(this.camera.PictureSourceType.SAVEDPHOTOALBUM, callback)
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }

  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    // Can be set to the src of an image now
//     console.log('data:image/jpeg;base64,'+image.base64String)
//     const base64String = "data:image/png;base64,"+image.base64String; // Replace this with your actual base64 string
//
// // Convert the base64 string to a Blob
//     const byteCharacters = atob(base64String.split(',')[1]);
//     const byteNumbers = new Array(byteCharacters.length);
//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);
//     const blob = new Blob([byteArray], { type: 'image/png' }); // Adjust the MIME type accordingly
//
// // Create a File object from the Blob
//     const file = new File([blob], 'filename.png', { type: 'image/png' });
//
    this.form.file_extension=image.format
    this.form.create_post_image = image.base64String
  }

  protected readonly environment = environment;
  protected readonly localStorage = localStorage;
  protected readonly JSON = JSON;

  async chooseImage($event: any) {
    this.targetFile=await myLib.toBase64($event.target.files[0])
    this.form.create_post_image=$event.target.files[0]
    this.form.file_extension=myLib.fileExtension($event.target.files[0])
  }


}
