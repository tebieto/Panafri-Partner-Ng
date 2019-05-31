import { Component, OnInit } from "@angular/core";
import { Signup } from "../../shared/authentication/signup/signup.model";
import { SignupService } from "../../shared/authentication/signup/signup.service";
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-about',
  templateUrl: 'reset-password.page.html',
  styleUrls: ['reset-password.page.scss'],
  providers: [SignupService]
})
export class ResetPasswordPage implements OnInit {
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
    this.signupService.reset(this.user)
    .subscribe(
      (result) => {
        if(result.success) {
          alert("A new password has been sent to your email address")
          return
        }
    },
      (error) => {

        if(error.status==500 ) {
          alert("Internal server error.")
          return
        }

        if(error.status==400 ) {
          alert("Invalid email address.")
          return
        }

        let body = JSON.parse(error._body)
        console.log(body)
       
        if (body){
          body = body.replace(/"|}|\{|]|\[/g, "")
          body = body.replace(/,/g, " ")
          alert(body)
          return
        }

        alert("Unfortunately we could not establish a connection.")
        return
    }
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
