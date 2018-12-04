import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.page.html',
  styleUrls: ['./add-services.page.scss'],
})
export class AddServicesPage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  goBackToStores() {
    this.router.navigate(['dashboard/services']);
  }

}
