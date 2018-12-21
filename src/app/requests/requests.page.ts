import { Component, OnInit } from '@angular/core';
import { Requests } from "../shared/requests/requests.model";
import { RequestsService } from "../shared/requests/requests.service";
import { Request } from "../shared/request/request.model";
import { RequestService } from "../shared/request/request.service";
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Notification } from "../shared/notification/notification.model";
import {  NotificationService } from "../shared/notification/notification.service";



@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
  providers: [RequestsService,RequestService,NotificationService]
})
export class RequestsPage implements OnInit {
  requestList=[]
  incomingList=[]
  cancelledList=[]
  successList=[]
  public currentTab: any;
  showIncoming= false
  not: Notification;
  request: Request
  AuthId=""
  AuthName= ""
  AuthAvatar=""
  buyerName=""
  productName=""
  productImage=""
  productPrice=""
  token=""
  BuyerDeviceToken=""
  NotTitle=""
  NotBody=""
  NotImage=""
  isLoading=false
  listLoaded=true
  params = {}
  constructor(
    private RequestsService: RequestsService,
    private RequestService: RequestService,
    private route: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private notificationService: NotificationService,  
  ) { 
    this.not = new Notification();
    this.request = new Request
  }

  ngOnInit() {
    this.currentTab = 'all';

    this.route.queryParams.subscribe(params => {
     
      this.incomingList.push(params)

      this.BuyerDeviceToken=params.device
      this.productName= params.name
      this.AuthId=params.owner
      this.productPrice=params.price
      this.productImage=params.image
      this.AuthName= params.auth
      this.AuthAvatar= params.authAvi
      if(this.incomingList[0].name) {
        this.showIncoming= true
        
      }


    });
    
    this.storage.get('token').then((val) => {
        
      this.params = {token:val}
   
    
     
      this.RequestsService.load(this.params)
        .subscribe(loadedRequests => {
          loadedRequests.forEach((requestObject) => {
            if(!requestObject.product) {
              return
            } 
            this.requestList.unshift(requestObject);
            if(requestObject["status"]==2) {
              this.cancelledList.unshift(requestObject);
            }
            if(requestObject["status"]==1) {
              this.successList.unshift(requestObject);
            }
          });
          this.isLoading = false;
          this.listLoaded = true;
          console.log(this.requestList);
        });
          
      });
  }

  notify(type) {
    this.not.id = this.AuthId;
    this.not.title = this.AuthName.toUpperCase();
    this.not.body = this.AuthName.toUpperCase() + " " + type + " " + this.productName;
    this.not.image = this.productImage;
    this.not.type= "Request"
    this.not.name = this.productName
    this.not.price = this.productPrice
    this.not.icon = this.AuthAvatar;
    this.not.app = "partner";
    this.not.deviceToken = this.BuyerDeviceToken

    this.notificationService.notification(this.not)
.subscribe(
  (result) => {
   console.log(result)
   this.notify("declined")
},
  (error) => {
    alert("Unfortunately we could not push notification.")
    this.router.navigate(['login']);
  }
);

}

byType(type){
  if(type==1){
    return "sold"
  } else {
    return "served as"
  }
}

accept(rid){

  this.storage.get('token').then((val) => {
        
    this.request.id=rid
    this.request.token = val
    this.RequestService.accept(this.request)
      .subscribe(result => {
        console.log("result")
        this.notify("accepted")
      });
        
    });

}

decline(rid){

  this.storage.get('token').then((val) => {
        
    this.request.token
   this.request.id=rid
    this.RequestService.accept(this.request)
      .subscribe(result => {
        console.log("result")
        this.notify("accepted")
      });
        
    });

}

checkAll(){
  if(this.incomingList[0].name) {
    return 0
  } else {
    return 1
  }
}

checkIncoming(){
  if(this.incomingList[0].name) {
    return 1
  } else {
    return 0
  }
}



  segmentChanged(event) {
    this.currentTab = event.detail.value;
  }

}
