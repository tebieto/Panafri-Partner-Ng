import { Component, OnInit } from '@angular/core';
import { Service } from "../../shared/add-service/service.model";
import { ServiceService } from "../../shared/add-service/service.service";
import { Categories } from "../../shared/categories/categories.model";
import { CategoriesService } from "../../shared/categories/categories.service";
import { Stores } from "../../shared/stores/stores.model";
import { StoresService } from "../../shared/stores/stores.service";
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { ImageManagementService } from '../../shared/files/image-management.service';
import { PermissionError } from '../../shared/files/permission-error';
import { RealFileLoaderService } from '../../shared/files/real-file-loader.service';

@Component({
  selector: 'app-new-services',
  templateUrl: './new-services.page.html',
  styleUrls: ['./new-services.page.scss'],
  providers: [ServiceService, ImageManagementService, RealFileLoaderService, CategoriesService, StoresService]
})
export class NewServicesPage implements OnInit {
  categoryList: Array<Categories> = [];
  storeList=[]
  service: Service
  imagePaths: string[];
  image:{}
  debugging=true

  isDesktop: boolean;
  imgPreview = 'https://img.icons8.com/material/480/000000/compact-camera.png';
  avatar=""
  constructor(
    private serviceService: ServiceService,
    private storage: Storage,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private imageManagementService: ImageManagementService,
    private CategoriesService: CategoriesService,
    private storesService: StoresService,
    private router: Router, 
   ){
    this.service= new Service
   } 

   ngOnInit(){
    this.storage.get('token').then((val) => {
      this.service.token = val
    

    this.CategoriesService.load()
    .subscribe(loadedCategories => {
      loadedCategories.forEach((categoryObject) => {
        //console.log(categoryObject)
        if(categoryObject.type==2)
        this.categoryList.unshift(categoryObject);
      });
      
      
    });

    let param = {token:val}
    this.storesService.load(param)
    .subscribe(loadedStores => {
      loadedStores.forEach((storeObject) => {
        this.storeList.unshift(storeObject);
      });
      
      
    });

  });

  }


  async uploadFromImagePicker() {
    try {
      let result= await this.imageManagementService.uploadFromImagePicker();
      console.log(result['URL'])
      this.imgPreview=result['URL']
      this.service.image= this.imgPreview
         
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

  

  saveService() {

    if(!this.service.store){
      alert("Select store")
      return
    }

    if(!this.service.image && this.debugging==false){
      alert("Upload a service image")
      return
    }

    if(!this.service.image){
      this.service.image=this.imgPreview
    }

    if(!this.service.name || !this.service.image || !this.service.description || !this.service.price || !this.service.location || !this.service.category || !this.service.store) {
      alert("All fields are required")
      return
    }

    this.serviceService.service(this.service)
      .subscribe(
        (result) => {
          if (result.success){
            alert("Service added sucessfully")
            this.goBackToService()
            return
          }
          

         
      },
        (error) => {
          
          alert("Unfortunately we could not send request.")
        } 
      );
      
  }

  goBackToService() {
    this.router.navigate(['dashboard', 'services']);
  }


}
