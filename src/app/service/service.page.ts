import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Service } from "../shared/add-service/service.model";
import { ServiceService } from "../shared/add-service/service.service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
  providers: [ServiceService]
})
export class ServicePage implements OnInit {

  service: Service
  Service={}
  Id=""
  Name=""
  Image=""
  Category=""
  Description=""
  Price=""
  Quantity=""
  Left=""

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private serviceService: ServiceService,
    private storage: Storage
  ) { 
    this.service = new Service
  }

  ngOnInit() {

    this.storage.get('token').then((val) => {
      this.service.token = val
    });

    this.route.queryParams.subscribe(params => {
      this.Service=params
      this.Id=params.id
      this.Name=params.name
      this.Price=params.price
      this.Image=params.image
      this.Category=params.category
      this.Description=params.description
      //console.log(params)
    });
  }

  startDeleteService(){
    let c = confirm("Are you sure you want to delete this service?")
    if (!c){
      return
    } else {
      this.deleteService()
    }
  }

  editService(){
    //console.log(this.Service)
    this.router.navigate(['dashboard', 'services', 'edit'], { queryParams: this.Service });
  }

  deleteService(){

    this.service.id= parseInt(this.Id)
    this.serviceService.delete(this.service)
      .subscribe(
        (result) => {
          alert(result.success)
          this.goBackToService()
         
      })
  }

  goBackToService() {
    this.router.navigate(['dashboard', 'services']);
  }

}
