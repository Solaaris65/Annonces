import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { ActionSheetController } from '@ionic/angular'
import { ToastController } from '@ionic/angular'
// import { TransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path/ngx';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
 


  lastImage: string = null;
  constructor(private camera: Camera, private file: File, public platform: Platform, private toastCtrl: ToastController, private filePath: FilePath, public actionSheetCtrl: ActionSheetController) { }
  ngOnInit() {
  }



  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('ios')) {
        alert('Routine IOS');
        this.filePath.resolveNativePath(imagePath).then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));

          // alert(correctPath);
          alert(correctPath + currentName);
          this.lastImage = correctPath + currentName;
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
      } else {
        alert('Routine Android'); // This part runs
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);

        this.lastImage = this.file.dataDirectory + currentName;

        alert(this.lastImage); // this also has the image path.

        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }




  private copyFileToLocalDir(namePath, currentName, newFileName) {
    // this.presentToast(namePath,currentName,newFileName);
    this.file.copyFile(namePath, currentName, this.file.externalDataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }




  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }


  
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
