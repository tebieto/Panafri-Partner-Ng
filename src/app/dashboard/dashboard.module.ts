import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home/home.page';
import { DashboardPage } from './dashboard.page';
import { ProductsPage } from '../products/products.page';
import { NewProductsPage } from '../products/new-products/new-products.page';
import { ProductViewPage } from '../products/product-view/product-view.page';
import { ReviewsPage } from '../reviews/reviews.page';
import { RequestsPage } from '../requests/requests.page';
import { StoresPage } from '../stores/stores.page';
import { SettingsPage } from '../settings/settings.page';
import { ServicesPage } from '../services/services.page';


const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', component: DashboardPage,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomePage
      },
      {
        path: 'products',
        component: ProductsPage,
      },
      {
        path: 'product/:id',
        component: ProductViewPage
      },
      {
        path: 'products/new',
        component: NewProductsPage
      },
      {
        path: 'reviews',
        component: ReviewsPage
      },
      {
        path: 'requests',
        component: RequestsPage
      },
      {
        path: 'stores',
        component: StoresPage
      },
      {
        path: 'settings',
        component: SettingsPage
      },
      {
        path: 'services',
        component: ServicesPage
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardPage,
    HomePage,
    ProductsPage,
    NewProductsPage,
    ProductViewPage,
    ReviewsPage,
    RequestsPage,
    StoresPage,
    SettingsPage,
    ServicesPage
  ]
})
export class DashboardPageModule {}
