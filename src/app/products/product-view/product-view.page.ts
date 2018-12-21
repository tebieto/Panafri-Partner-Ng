import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from "../../shared/add-product/product.model";
import { ProductService } from "../../shared/add-product/product.service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
  providers: [ProductService]
})
export class ProductViewPage implements OnInit {
  product: Product
  Product={}
  Id=""
  Name=""
  Image=""
  Category=""
  Description=""
  Price=""
  Quantity=""
  Left=""



  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private productService: ProductService,
    private storage: Storage
  ) {
    this.product= new Product
   }

  ngOnInit() {
    this.storage.get('token').then((val) => {
      this.product.token = val
    });
    this.route.queryParams.subscribe(params => {
      this.Product=params
      this.Id=params.id
      this.Name=params.name
      this.Price=params.price
      this.Image=params.image
      this.Category=params.category
      this.Description=params.description
    });
  }

  editProduct(){
    console.log(this.Product)
    this.router.navigate(['dashboard', 'products', 'edit'], { queryParams: this.Product });
  }

  deleteProduct(){
    this.product.id= parseInt(this.Id)
    this.productService.delete(this.product)
      .subscribe(
        (result) => {
          alert(result.success)

         
      })

  }

  goBackToProducts() {
    this.router.navigate(['dashboard', 'products']);
  }

}
