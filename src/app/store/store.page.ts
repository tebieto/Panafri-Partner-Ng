import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  goBackToStores() {
    this.router.navigate(['dashboard/stores']);
  }

}
