import { Component,  OnInit } from '@angular/core';
import { Product } from "../../shared/add-product/product.model";
import { ProductService } from "../../shared/add-product/product.service";
import { Categories } from "../../shared/categories/categories.model";
import { CategoriesService } from "../../shared/categories/categories.service";
import { Stores } from "../../shared/stores/stores.model";
import { StoresService } from "../../shared/stores/stores.service";
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { ImageManagementService } from '../../shared/files/image-management.service';
import { PermissionError } from '../../shared/files/permission-error';
import { RealFileLoaderService } from '../../shared/files/real-file-loader.service';


@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.page.html',
  styleUrls: ['./new-products.page.scss'],
  providers: [ProductService, ImageManagementService, RealFileLoaderService, CategoriesService, StoresService]
})
export class NewProductsPage implements OnInit {
  categoryList: Array<Categories> = [];
  storeList=[]
  imagePaths: string[];
  image:{}
  debugging = true

  isDesktop: boolean;
 imgPreview = 'https://img.icons8.com/material/480/000000/compact-camera.png';
 avatar=""
 product: Product
  constructor(
    private productService: ProductService,
    private storage: Storage,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private route: ActivatedRoute,
    private router: Router,
    private imageManagementService: ImageManagementService,
    private CategoriesService: CategoriesService,
    private storesService: StoresService,
  ) {
    this.product= new Product
    this.product.store = 0
   }

   async ngOnInit(){

    this.storage.get('token').then((val) => {
      this.product.token = val
    

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
 
    this.productService.product(this.product)
      .subscribe(
        (result) => {
          if(result.success){
            alert("Product added successfully")
            this.router.navigate(["dashboard", "products"])
            return
            
          }

         
      },
        (error) => {
          if(error.status==500){
            alert(" A Server Error occoured while saving product. Cross-check form and try again.")
            return
          }
          console.log(error)
          alert("Unfortunately we could not send request.")
        } 
      );
      
  }

}
