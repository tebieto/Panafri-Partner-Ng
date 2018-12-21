import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from "../shared/products/products.model";
import { ProductsService } from "../shared/products/products.service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  providers: [ProductsService]
})
export class ProductsPage implements OnInit {
  productList: Array<Products> = [];
  isToggled: Boolean = false;
  isLoading= false
  listLoaded= true
  token=""

  constructor(
    public router: Router,
    private ProductsService: ProductsService,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.storage.get('token').then((val) => {
      this.token = val
    
    this.ProductsService.load(this.token)
      .subscribe(loadedProducts => {
        loadedProducts.forEach((productObject) => {
        
          this.productList.unshift(productObject);
        },
        (error) => { 
          alert("Unfortunately we could not send request.")
        });

        this.isLoading = false;
        this.listLoaded = true;
        
        
      });
    });
      
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  viewProduct(item) {
    this.storage.get('token').then((val) => {
    var Product= this.productList.find(p => {
     return p.id===item
     });
     let result = {token: val}
     const param = Object.assign({}, result, Product);
     this.router.navigate(['dashboard', 'product', 12], { queryParams: param });

    });
   }


  toggleSearch() {
    this.isToggled = !this.isToggled;
  }

  goToNewProduct() {
    this.router.navigateByUrl('dashboard/products/new');
  }

}
