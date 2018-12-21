import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Store } from "../shared/add-store/store.model";
import { StoreService } from "../shared/add-store/store.service";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
  providers: [StoreService]
})
export class StorePage implements OnInit {
  store: Store
  Store={}
  Id=""
  Name=""
  Image=""
  Description=""
  Address=""
  Identity=""
  Phone=""
  Email=""
  State=""
  Status= ""


  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private storeService: StoreService,
    private storage: Storage
  ) { 
    this.store = new Store();
  }

  ngOnInit() {

    this.storage.get('token').then((val) => {
      this.store.token = val
    });

    this.route.queryParams.subscribe(params => {
      this.Store=params
      this.Id=params.id
      this.Name=params.name
      this.Phone=params.phone
      this.Email=params.email
      this.Image=params.image
      this.Address=params.address
      this.State=params.state
      this.Description=params.description
      this.Identity=params.identity
      if(params.status==1){
        this.Status="Offline"
      } else {
        this.Status="Offline"
      }
    });
  }

  editStore(){
    console.log(this.Store)
    this.router.navigate(['dashboard', 'stores', 'edit'], { queryParams: this.Store });
  }

  deleteStore(){
    this.store.id= parseInt(this.Id)
    this.storeService.delete(this.store)
    .subscribe(
      (result) => {
        console.log(result)

       
    })
  }

  goBackToStores() {
    this.router.navigate(['dashboard/stores']);
  }

}
