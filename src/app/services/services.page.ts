import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Services } from "../shared/services/services.model";
import { ServicesService } from "../shared/services/services.service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  providers: [ServicesService]
})
export class ServicesPage implements OnInit {
  serviceList: Array<Services> = [];
  isLoading=false
  listLoaded=true
  token=""
  constructor(
    public router: Router,
    private ServicesService: ServicesService,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.isLoading = true;
    this.storage.get('token').then((val) => {
      this.token = val

    this.ServicesService.load(this.token)
      .subscribe(loadedServices => {
        console.log(loadedServices)
        if(loadedServices.length<1){
          alert("You currently have no servic to display")
          return
        }
        loadedServices.forEach((serviceObject) => {
          this.serviceList.unshift(serviceObject);
        });
        this.isLoading = false;
        this.listLoaded = true;
      });
    });
  }

  goToNewService() {
    this.router.navigateByUrl('dashboard/services/new');
  }

  viewService(item) {
    this.storage.get('token').then((val) => {
    var Service= this.serviceList.find(p => {
     return p.id===item
     });
     let result = {token: val}
     const param = Object.assign({}, result, Service);
     this.router.navigate(['service'], { queryParams: param });

    });
   }

}
