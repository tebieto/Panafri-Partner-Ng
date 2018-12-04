import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  isToggled: Boolean = false;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }


  toggleSearch() {
    this.isToggled = !this.isToggled;
  }

  goToNewProduct() {
    this.router.navigateByUrl('dashboard/products/new');
  }

  viewProduct(i) {
    this.router.navigate(['dashboard', 'product', 12]);
  }

}
