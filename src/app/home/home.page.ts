import { Component, OnInit } from '@angular/core';
import { Login } from "../shared/authentication/login/login.model";
import { LoginService } from "../shared/authentication/login/login.service";
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [LoginService]
})
export class HomePage implements OnInit {
  user: Login;
  buyerDevice=""
  DeviceToken=""
  NotTitle=""
  NotBody=""
  NotImage=""
  NotIcon=""
  isLoggingIn = true;
  isLoading = false;
  Product= {};
  constructor(
    private router: Router, 
    private loginService: LoginService,
    private route: ActivatedRoute,
    private storage: Storage,
    private fcm: FCM,
    private localNotifications: LocalNotifications
    ) {

    this.user = new Login();
    this.user.email = "tebieto@gmail.com";
    this.user.password = "1223454allu4";
    
  
  }

  ngOnInit() {

    this.fcm.getToken().then(token => {
      this.DeviceToken=token;
      this.storage.set('deviceToken', this.DeviceToken);
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      this.DeviceToken=token;
      this.storage.set('deviceToken', this.DeviceToken);
    });

    

    
    this.route.queryParams.subscribe(params => {

    }
    );
  }


  
  Login() {
    this.user.deviceToken= this.DeviceToken;
    
    this.isLoading = true;
    
    this.loginService.login(this.user)
      .subscribe(
        (result) => {
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
          this.storage.set('deviceToken', this.DeviceToken);

          this.router.navigate(["dashboard"], { queryParams: param });
      },
        (error) => alert("Unfortunately we could not find your account.")
      );
      
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  Register() {

    this.router.navigate(["/RequestRegister"], { queryParams: this.Product });
  }

  public goBack() {
  }

}