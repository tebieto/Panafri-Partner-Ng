import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from './popover/popover.page';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products=""
  services=""
  requests=""
  customers=""
  earnings=""
  reviews=""
  constructor(
    public popoverController: PopoverController,
    public router: Router,
    public route: ActivatedRoute,
    private storage: Storage
  ) {}


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      
      }
      );

      this.storage.get('products').then((val) => {
        
        this.products = val
      });

      this.storage.get('services').then((val) => {
        
        this.services = val
      });
      
      this.storage.get('earnings').then((val) => {
        
        this.earnings = val
      });

      this.storage.get('customers').then((val) => {
        
        this.customers = val
      });

      this.storage.get('requests').then((val) => {
        
        this.requests = val
      });

      this.storage.get('reviews').then((val) => {
        
        this.reviews = val
      });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }


  goToNewProduct() {
    this.router.navigateByUrl('dashboard/products/new');
  }
  goToNewService() {
    this.router.navigateByUrl('dashboard/services/new');
  }
  goToNewStore() {
    this.router.navigateByUrl('dashboard/stores/new');
  }

}
