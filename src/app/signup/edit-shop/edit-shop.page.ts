import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Store } from "../../shared/add-store/store.model";
import { StoreService } from "../../shared/add-store/store.service";
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { ImageManagementService } from '../../shared/files/image-management.service';
import { PermissionError } from '../../shared/files/permission-error';
import { RealFileLoaderService } from '../../shared/files/real-file-loader.service';

@Component({
  selector: 'edit-shop',
  templateUrl: 'edit-shop.page.html',
  styleUrls: ['edit-shop.page.scss'],
  providers: [StoreService, ImageManagementService, RealFileLoaderService]
})
export class EditShopPage implements OnInit{
  imagePaths: string[];
  image:{}

  isDesktop: boolean;
 imgPreview = 'https://res.cloudinary.com/sportbay-co/image/upload/v1537287942/user_svhfyt.png';
 avatar=""
  store: Store
  constructor(
    public loadingController: LoadingController,
    public router: Router,
    private storeService: StoreService,
    private storage: Storage,
    private route: ActivatedRoute,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private imageManagementService: ImageManagementService,
  ) { 
    this.store = new Store();
  }

  ngOnInit(){
    this.storage.get('token').then((val) => {
      this.store.token = val
    });

    this.route.queryParams.subscribe(params => {
      this.store.id=params.id
      this.store.name=params.name
      this.store.image=params.image
      this.store.description=params.description
      this.store.email=params.email
      this.store.identity=params.identity
      this.store.landmark=params.landmark
      this.store.phone=params.phone
      this.store.state=params.state
      this.store.address=params.address
      this.imgPreview=params.image
    });
  }

  async uploadFromImagePicker() {
    try {
      let result= await this.imageManagementService.uploadFromImagePicker();
      console.log(result['URL'])
      this.imgPreview=result['URL']
         
    } catch(error) {
      console.log(error);
      if (error instanceof PermissionError) {
        alert('You must give the app permission for the gallery before you can choose an image');
      }
    }
  }

  async uploadFromCamera() {
    try {
      await this.imageManagementService.uploadFromCamera();
      await this.loadImagePaths();
    } catch(error) {
      console.log(error);
    }
  }

  async uploadWebFile(event) {
    const formData = new FormData();
    Array.from(event.target.files).forEach((file: File) => formData.append('photos', file, file.name));
    await this.imageManagementService.uploadImages(formData);
  }

  private async loadImagePaths() {
    this.imagePaths = await this.imageManagementService.listImagesOnServer();
  }

  saveStore() {
    this.store.image=this.imgPreview
    this.storeService.edit(this.store)
      .subscribe(
        (result) => {
          console.log(result)

         
      },
        (error) => {
          
          alert("Unfortunately we could not send request.")
        } 
      );
      
  }

  async savePersonalDetails() {
    const loading = await this.loadingController.create({
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.router.navigate(['dashboard']);
    }, 1000);
  }
}




