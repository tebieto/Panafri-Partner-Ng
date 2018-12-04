import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  goToStore() {
    this.router.navigate(['store', 2]);
  }

}
