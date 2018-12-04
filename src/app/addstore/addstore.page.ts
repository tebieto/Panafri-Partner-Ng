import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstore',
  templateUrl: './addstore.page.html',
  styleUrls: ['./addstore.page.scss'],
})
export class AddstorePage implements OnInit {

  constructor(
    public loadingController: LoadingController,
    public router: Router,
    public location: Location
  ) { }

  ngOnInit() {}

  async saveStore() {
    const loading = await this.loadingController.create({
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.router.navigate(['store', 2]);
    }, 1000);
  }

  goBack() {
    this.location.back();
  }

}
