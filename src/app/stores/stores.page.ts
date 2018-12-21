import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StoresService } from "../shared/stores/stores.service";

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
  providers: [StoresService]
})
export class StoresPage implements OnInit {
  storeList= [];
  params=""
  constructor(
    private StoresService: StoresService,
    public router: Router,
    private storage: Storage,
  ) { }

  ngOnInit() {

    this.storage.get('token').then((val) => {
        
      let params = {token:val}
    
    
     
      this.StoresService.load(params)
        .subscribe(loadedStores => {
          loadedStores.forEach((storeObject) => {
            this.storeList.unshift(storeObject);
          });
          
          console.log(this.storeList);
        });

      });

  }

  checkOnline(status){
    if (status==0){
      return "Offline"
    } else {
      return "Online"
    }
  }

  goToStore(item) {
    this.storage.get('token').then((val) => {
      var Store= this.storeList.find(p => {
       return p.id===item
       });
       let result = {token: val}
       const param = Object.assign({}, result, Store);
       this.router.navigate(['store', 2], { queryParams: param });
  
      });
  }

}
