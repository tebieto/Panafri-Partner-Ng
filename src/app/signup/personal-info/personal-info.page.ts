import { Component, OnInit } from "@angular/core";
import { Signup } from "../../shared/authentication/signup/signup.model";
import { SignupService } from "../../shared/authentication/signup/signup.service";
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-about',
  templateUrl: 'personal-info.page.html',
  styleUrls: ['personal-info.page.scss'],
  providers: [SignupService]
})
export class PersonalInfoPage implements OnInit {
  user: Signup;
  DeviceToken=""
  NotTitle=""
  NotBody=""
  NotImage=""
  NotIcon=""
  isLoggingIn = true;
  isLoading = false;
  constructor(private router: Router, 
    private signupService: SignupService,
    public loadingController: LoadingController,
    private storage: Storage
    ) {
    this.user = new Signup();
  
  }

  ngOnInit() {

    this.storage.get('deviceToken').then((val) => {
    this.DeviceToken = val
    });


  }
   
  signUp() {
    this.user.deviceToken= this.DeviceToken;
    this.isLoading = true;
    this.signupService.signup(this.user)
    .subscribe(
      (result) => {
        console.log("result:" +result)
        this.isLoading = false;
          const param = { 
            jwt: result.token,
            products: result.products,
            services: result.services,
            requests: result.requests,
            customers: result.customers,
            earnings: result.earnings,
            reviews: result.reviews  
          }

          
          this.storage.set('token', param.jwt);
          this.storage.set('reviews', param.reviews);
          this.storage.set('products', param.products);
          this.storage.set('services', param.services);
          this.storage.set('requests', param.requests);
          this.storage.set('customers', param.customers);
          this.storage.set('earnings', param.earnings);

          this.router.navigate(["dashboard"], { queryParams: param });
    },
      (error) => alert("Unfortunately we could not create your account.")
    );
      
  }


  public goBack() {
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }

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
