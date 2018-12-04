import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  goBackToProducts() {
    this.router.navigate(['dashboard', 'products']);
  }

}
