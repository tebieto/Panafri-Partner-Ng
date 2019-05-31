import { Component, OnInit } from "@angular/core";
import { Signup } from "../../shared/authentication/signup/signup.model";
import { SignupService } from "../../shared/authentication/signup/signup.service";
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from "@angular/router";
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { ImageManagementService } from '../../shared/files/image-management.service';
import { PermissionError } from '../../shared/files/permission-error';
import { RealFileLoaderService } from '../../shared/files/real-file-loader.service';



@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.page.html',
  styleUrls: ['edit-profile.page.scss'],
  providers: [SignupService, ImageManagementService, RealFileLoaderService]
})
export class EditProfilePage implements OnInit {
  imagePaths: string[];
  image:{}

  isDesktop: boolean;
 imgPreview = 'https://res.cloudinary.com/sportbay-co/image/upload/v1537287942/user_svhfyt.png';
 avatar=""
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
    private storage: Storage,
    private route: ActivatedRoute,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private imageManagementService: ImageManagementService,
    ) {
    this.user = new Signup();
  
  
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user.name= params.name
      this.user.avatar=params.avatar
      this.user.email=params.email
      this.user.phone= params.phone
      this.imgPreview=params.avatar
      this.storage.get("token").then((val)=>{
        this.user.token=val
      })
      
    })

  }

  async uploadFromImagePicker() {
    try {
      let result= await this.imageManagementService.uploadFromImagePicker();
      console.log(result['URL'])
      this.imgPreview=result['URL']
         
    } catch(error) {
      console.log(error);
      if (error instanceof PermissionError) {
        alert('You must give the app permission for the gallery before you can choose an image');
      }
    }
  }

  async uploadFromCamera() {
    try {
      await this.imageManagementService.uploadFromCamera();
      await this.loadImagePaths();
    } catch(error) {
      console.log(error);
    }
  }

  async uploadWebFile(event) {
    const formData = new FormData();
    Array.from(event.target.files).forEach((file: File) => formData.append('photos', file, file.name));
    await this.imageManagementService.uploadImages(formData);
  }

  private async loadImagePaths() {
    this.imagePaths = await this.imageManagementService.listImagesOnServer();
  }
   
  signUp() {
    this.isLoading = true;
    this.user.avatar=this.imgPreview
    this.signupService.edit(this.user)
    .subscribe(
      (result) => {
        if(result.success){
          alert("Profile edited successfully.")
        }
    },
    (error) => {

      let body = JSON.parse(error._body)
      //console.log(body)
     
      if (body){
        body = body.replace(/"|}|\{|]|\[/g, "")
        body = body.replace(/,/g, " ")
        alert(body)
        return
        
      }

      alert("Unfortunately we could not create your account.")
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
