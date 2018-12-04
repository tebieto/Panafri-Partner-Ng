import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  goToNewService() {
    this.router.navigate(['add-services']);
  }

  viewService() {
    this.router.navigate(['service']);
  }

}
