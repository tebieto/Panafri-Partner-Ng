import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  goBackToService() {
    this.router.navigate(['dashboard', 'services']);
  }

}
