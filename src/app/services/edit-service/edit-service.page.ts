import { Component, OnInit } from '@angular/core';
import { Service } from "../../shared/add-service/service.model";
import { ServiceService } from "../../shared/add-service/service.service";
import { Categories } from "../../shared/categories/categories.model";
import { CategoriesService } from "../../shared/categories/categories.service";
import { Stores } from "../../shared/stores/stores.model";
import { Router } from '@angular/router';
import { StoresService } from "../../shared/stores/stores.service";
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { ImageManagementService } from '../../shared/files/image-management.service';
import { PermissionError } from '../../shared/files/permission-error';
import { RealFileLoaderService } from '../../shared/files/real-file-loader.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.page.html',
  styleUrls: ['./edit-service.page.scss'],
  providers: [ServiceService, ImageManagementService, RealFileLoaderService, CategoriesService, StoresService]
})
export class EditServicePage implements OnInit {
  categoryList: Array<Categories> = [];
  storeList=[]
  imagePaths: string[];
  image:{}
  debugging=true

  isDesktop: boolean;
 imgPreview = "";
 avatar=""
  service: Service
  constructor(
    private serviceService: ServiceService,
    private storage: Storage,
    private route: ActivatedRoute,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private router: Router,
    private imageManagementService: ImageManagementService,
    private CategoriesService: CategoriesService,
    private storesService: StoresService,
   ){
    this.service= new Service
   } 

   ngOnInit(){
    this.storage.get('token').then((val) => {
      this.service.token = val
    

    this.route.queryParams.subscribe(params => {
      this.service.id=params.id
      this.service.name=params.name
      this.service.price=params.price
      this.service.image=params.image
      this.service.category=params.category
      this.service.description=params.description
      this.service.location=params.location
      this.service.store=params.store
      this.imgPreview=params.image
      //console.log(params)
    });

    this.CategoriesService.load()
    .subscribe(loadedCategories => {
      loadedCategories.forEach((categoryObject) => {
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
     // console.log(result['URL'])
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
      alert("Upload a service image.")
      return
    }

    if(!this.service.image){
      this.service.image=this.imgPreview
    }

    if(!this.service.name || !this.service.image || !this.service.description || !this.service.price || !this.service.location || !this.service.category || !this.service.store) {
      alert("All fields are required")
      
      return
    }

    this.serviceService.edit(this.service)
      .subscribe(
        (result) => {
          
          if(result.success){
          alert("Service updated successfully.")
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
