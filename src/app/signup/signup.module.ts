import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignupPageRoutingModule } from './signup.router.module';

import { SignupPage } from './signup.page';
import { PersonalInfoPageModule } from '../signup/personal-info/personal-info.module';
import { ShopInfoPageModule } from '../signup/shop-info/shop-info.module';
import { HomePageModule } from '../home/home.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SignupPageRoutingModule,
    HomePageModule,
    PersonalInfoPageModule,
    ShopInfoPageModule
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
