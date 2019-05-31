import { Component, OnInit } from '@angular/core';
import { Product } from "../../shared/add-product/product.model";
import { ProductService } from "../../shared/add-product/product.service";
import { Categories } from "../../shared/categories/categories.model";
import { CategoriesService } from "../../shared/categories/categories.service";
import { Stores } from "../../shared/stores/stores.model";
import { StoresService } from "../../shared/stores/stores.service";
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { ImageManagementService } from '../../shared/files/image-management.service';
import { PermissionError } from '../../shared/files/permission-error';
import { RealFileLoaderService } from '../../shared/files/real-file-loader.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
  providers: [ProductService, ImageManagementService, RealFileLoaderService, CategoriesService, StoresService]
})
export class EditProductPage implements OnInit {
  categoryList: Array<Categories> = [];
  storeList=[]
  imagePaths: string[];
  image:{}
  debugging= true

  isDesktop: boolean;
 imgPreview = 'https://res.cloudinary.com/sportbay-co/image/upload/v1537287942/user_svhfyt.png';
 avatar=""
 product: Product
  constructor(
    private productService: ProductService,
    private storage: Storage,
    private route: ActivatedRoute,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private imageManagementService: ImageManagementService,
    private CategoriesService: CategoriesService,
    private storesService: StoresService,
  ) {
    this.product= new Product
   }

   ngOnInit(){

    this.storage.get('token').then((val) => {
      this.product.token = val


    this.route.queryParams.subscribe(params => {
      this.product.id=params.id
      this.product.name=params.name
      this.product.price=params.price
      this.product.image=params.image
      this.product.category=params.category
      this.product.description=params.description
      this.product.location=params.location
      this.product.store=params.store
      this.imgPreview=params.image
      //console.log(this.product)
    });

    this.CategoriesService.load()
        .subscribe(loadedCategories => {
          loadedCategories.forEach((categoryObject) => {
            if(categoryObject.type==1)
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
      this.product.image= this.imgPreview
         
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

  saveProduct() {
   
    if(!this.product.store){
      alert("Select store")
      return
    }

    if(!this.product.image && this.debugging==false){
      alert("Upload a product image")
      return
    }

    if(!this.product.image){
      this.product.image=this.imgPreview
    }

    if(!this.product.name || !this.product.image || !this.product.description || !this.product.price || !this.product.location || !this.product.category || !this.product.store) {
      alert("All fields are required")
      return
    }
    
    this.productService.edit(this.product)
      .subscribe(
        (result) => {
          alert(result.success)
          return
         
      },
        (error) => {
          
          alert("Unfortunately we could not send request.")
        } 
      );
      
  }

}
