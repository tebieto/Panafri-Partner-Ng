// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { TabsPage } from './tabs.page';
// import { HomePage } from '../home/home.page';
// import { AboutPage } from '../about/about.page';
// import { ContactPage } from '../contact/contact.page';

// const routes: Routes = [
//   {
//     path: 'tabs',
//     component: TabsPage,
//     children: [
//       {
//         path: '',
//         redirectTo: '/tabs/(home:home)',
//         pathMatch: 'full',
//       },
//       {
//         path: 'home',
//         outlet: 'home',
//         component: HomePage
//       },
//       {
//         path: 'about',
//         outlet: 'about',
//         component: AboutPage
//       },
//       {
//         path: 'contact',
//         outlet: 'contact',
//         component: ContactPage
//       }
//     ]
//   },
//   {
//     path: '',
//     redirectTo: '/tabs/(home:home)',
//     pathMatch: 'full'
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class TabsPageRoutingModule {}


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupPage } from './signup.page';
import { ShopInfoPage } from './shop-info/shop-info.page';
import { PersonalInfoPage } from './personal-info/personal-info.page';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupPage,
    children: [
      {
        path: '',
        redirectTo: '/signup/(personal:personal)',
        pathMatch: 'full',
      },
      {
        path: 'personal',
        outlet: 'personal',
        component: PersonalInfoPage
      },
      {
        path: 'shop',
        outlet: 'shop',
        component: ShopInfoPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/signup/(personal:personal)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupPageRoutingModule {}
