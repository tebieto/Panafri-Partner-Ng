import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  public currentTab: any;
  constructor() { }

  ngOnInit() {
    this.currentTab = 'successful';
  }


  segmentChanged(event) {
    this.currentTab = event.detail.value;
  }

}
