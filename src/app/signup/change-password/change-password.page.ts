import { Component, OnInit } from "@angular/core";
import { Signup } from "../../shared/authentication/signup/signup.model";
import { SignupService } from "../../shared/authentication/signup/signup.service";
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

  ``
@Component({
  selector: 'change-password',
  templateUrl: 'change-password.page.html',
  styleUrls: ['change-password.page.scss'],
  providers: [SignupService]
})
export class ChangePasswordPage implements OnInit {
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
    this.storage.get("token").then((val)=>{
      this.user.token=val
    })

  }
   
  signUp() {
    this.isLoading = true;
    this.signupService.change(this.user)
    .subscribe(
      (result) => {
        console.log("result:" +result)
        this.logout()
       
    },
      (error) => alert("Unfortunately we could not create your account.")
    );
      
  }


  public goBack() {
  }

  logout() {
    this.storage.set("token", "")
    this.router.navigate(['']);
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
