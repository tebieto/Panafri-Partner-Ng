import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  template: `
  <ion-list>
  <ion-item>
    <ion-label>Options</ion-label>
  </ion-item>
  <ion-item>
    <ion-label>Options</ion-label>
  </ion-item>
</ion-list>
  `
})
export class PopoverPage implements OnInit {

  constructor(public popoverController: PopoverController) {}

  ngOnInit() {
  }


}
