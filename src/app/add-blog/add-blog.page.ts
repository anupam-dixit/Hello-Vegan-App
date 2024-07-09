import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { Router } from '@angular/router';
import { OtherService } from '../service/other/other.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.page.html',
  styleUrls: ['./add-blog.page.scss'],
})
export class AddBlogPage implements OnInit {

  form = {
    post_category_id: "",
    title: null,
    tags: null,
    location: null,
    detail: null,
    user_id: null,
    image: null,
    galleryimage: [],
    videofile: null
  }
  constructor(private camera: Camera, private file:File, private api: ApiService, private router: Router, private other: OtherService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }
  async presentLoading(loading) {
    return await loading.present();
  }
  async AddBlog() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.form.user_id = JSON.parse(localStorage.getItem('userData'))?.id
    this.api.addBlog(this.form).subscribe(res => {
      loading.dismiss();
      this.other.presentToast(res['message'], 'checkmark-circle-outline', 'success');
      history.back();
    },
      err => {
        loading.dismiss();
        this.other.presentToast('Something went Wrong!!', 'information-circle-outline', 'danger');
      })
  }

  async chooseImage() {
    console.log('hi')
    this.captureImage(this.camera.PictureSourceType.SAVEDPHOTOALBUM, async obj => {
      this.form.image = obj.imagedata;
    })
  }
  // async chooseImage($event: any) {
  //   this.form.image=$event.target.files[0]
  // }

  removeImage(i) {
    this.form.galleryimage.splice(i, 1);
    console.log(this.form.galleryimage)
  }

  async chooseMultiImage() {
    this.captureImage(this.camera.PictureSourceType.SAVEDPHOTOALBUM, async obj => {
      this.form.galleryimage.push(obj.imagedata);
    })
  }

  captureImage(stype: number, callback) {
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: stype,
      allowEdit: false,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = `data:image/jpeg;base64,${imageData}`;
      let object;
      console.log(base64Image)
      if (stype == this.camera.PictureSourceType.CAMERA) {
        object = {
          "isCamera": true,
          "imagedata": base64Image
        }
        callback(object);
      }
      else {
        object = {
          "isCamera": false,
          "imagedata": base64Image
        }
        callback(object);

      }
    }, (err) => {
      // Handle error
    });
  }

  async chooseVideo() {
    this.captureVideo(this.camera.PictureSourceType.PHOTOLIBRARY, async obj => {
      this.form.videofile = obj.imagedata.nativeURL;
    })
  }

  captureVideo(stype: number, callback) {
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: stype,
    }
    this.camera.getPicture(options).then(async (videoUrl) => {
      // let base64Image = `data:image/jpeg;base64,${imageData}`;
      let object;
      var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
      var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

      dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;

      try {
        var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
        var retrievedFile = await this.file.getFile(dirUrl, filename, {});

      } catch(err) {
        console.log('error',err);
      }
      console.log(videoUrl,filename,dirpath, retrievedFile)
      if (stype == this.camera.PictureSourceType.CAMERA) {
        object = {
          "isCamera": true,
          "imagedata": retrievedFile
        }
        callback(object);
      }
      else {
        object = {
          "isCamera": false,
          "imagedata": retrievedFile
        }
        callback(object);

      }
    }, (err) => {
      // Handle error
    });
  }


}
