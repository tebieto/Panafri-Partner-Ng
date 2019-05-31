import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Signup } from "../shared/authentication/signup/signup.model";
import { UserService } from "../shared/user/user.service";
import { User } from "../shared/user/user.model";
import { Storage } from '@ionic/storage'
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [UserService]
})
export class DashboardPage implements OnInit {
userList: Array<User> = [];
user: Signup;
products=""
services=""
requests=""
customers=""
earnings=""
reviews=""
requestId=""
token=""
AuthName=""
AuthAvatar=""
buyerDevice=""
DeviceToken=""
NotTitle=""
NotBody=""
NotImage=""
NotIcon=""
NotRequestStatus=""
NotRequestType=""
NotProductName=""
NotProductOwner=""
NotProductPrice=""
NotBuyerName=""

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private UserService: UserService,
    private storage: Storage,
    private fcm: FCM,
    private localNotifications: LocalNotifications
  ) {
    this.user = new Signup();

    this.localNotifications.on('click').subscribe((notification) => {
      
      let requestType = this.checkRequestType()
      if(requestType=="Request"){
        //console.log("It worked:" + this.NotRequestType)
      let param = this.fetchNotData()

      this.router.navigate(["dashboard", "requests"], { queryParams: param });
      }

      if(this.NotRequestType=="Review"){
       // console.log("It worked:" + this.NotRequestType)
      this.router.navigate(["dashboard", "reviews"]);
      }

    })

   }

  ngOnInit() {
    this.storage.get('token').then((val) => {
    this.token=val
    this.UserService.load(val)
        .subscribe(loadedUser => {

         if(loadedUser[0].status){
           return this.logout()
         }
         this.AuthName=loadedUser[0].user.name
         this.AuthAvatar=loadedUser[0].user.avatar
          this.user.name=loadedUser[0].user.name
          this.user.email=loadedUser[0].user.email
          this.user.avatar=loadedUser[0].user.avatar
          this.user.phone=loadedUser[0].user.phone
          this.user.status=loadedUser[0].user.online
          this.user.password=""
          this.user.password_confirmation=""
          console.log(loadedUser)
          },
          (error) => {
            alert("Unfortunately we could not retireve your profile.")
            this.router.navigate(['login']);
          });
        });

        this.fcm.onNotification().subscribe(data => {
          if(data["app"]=="partner") {
            return false
          }
          this.buyerDevice=data["device"]
          this.NotBuyerName=data["title"]
          this.NotProductName=data['name']
          this.requestId=data['rid']
          this.NotProductPrice= data["price"]
         this.NotProductOwner=data["id"]
         this.NotRequestStatus=data["status"]
         this.NotRequestType=data["type"]
          this.localNotifications.schedule({
            id: data["id"],
            title: data["title"],
            text: data["body"],
            icon: data["image"],
            sound:'res://platform_default',
            smallIcon: data["icon"],
          });
          
          if(data.wasTapped){
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        });
          

    this.route.queryParams.subscribe(params => {
      this.products = params.products
      this.services=params.services
      this.requests=params.requests
      this.customers=params.requests
      this.earnings= params.earnings
      this.reviews= params.review

      }
      );

  }

  updateStatus(){
    if(this.user.status==1){
      
      this.UserService.onApp(this.token)
        .subscribe(response => {
          //console.log(response)
        });

     } else {
      this.UserService.offApp(this.token)
      .subscribe(response => {
        //console.log(response)
      });
     }
  }

  checkStatus(val) {
    if(val==1){
     return "Online"
    } else {
      return "Offline"
    }
  }

  editProfile(){
    let profile= {name:this.user.name, avatar:this.user.avatar, email:this.user.email, phone:this.user.phone}
    
    this.router.navigate(['dashboard', 'profile', 'edit'], {queryParams:profile});
  }

  logout() {
    this.storage.set("token", "")
    this.router.navigate(['']);
  }

  fetchNotData() {
    let param = {token:this.token, name:this.NotProductName, rid:this.requestId, auth: this.AuthName, avatar: this.NotIcon, authAvi:this.AuthAvatar, buyer:this.NotBuyerName, image: this.NotImage, owner:this.NotProductOwner, device:this.buyerDevice, price:this.NotProductPrice }
    return param
  }

  checkRequestType(){
    alert(this.NotRequestType)
  return this.NotRequestType
  }

}
