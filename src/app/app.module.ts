import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from './navbar/navbar.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RouterModule} from '@angular/router';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./added-modules/material.module";
import {OrdersComponent} from './orders/orders.component';
import {AdminOrdersComponent} from './admin-orders/admin-orders.component';
import {AdminProductsComponent} from './admin-products/admin-products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    ShoppingCartComponent,
    OrdersComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'shoppingCart',
        component: ShoppingCartComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'adminOrders',
        component: AdminOrdersComponent
      },
      {
        path: 'adminProducts',
        component: AdminProductsComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
