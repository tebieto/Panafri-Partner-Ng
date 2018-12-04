import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-about',
  templateUrl: 'personal-info.page.html',
  styleUrls: ['personal-info.page.scss']
})
export class PersonalInfoPage {

  constructor(
    public loadingController: LoadingController,
    public router: Router
  ) { }

  async savePersonalDetails() {
    const loading = await this.loadingController.create({
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.router.navigateByUrl('register/signup/(shop:shop)');
    }, 1000);
  }
}
