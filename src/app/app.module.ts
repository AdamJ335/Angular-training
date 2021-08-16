import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from "ng2-validation";
import {DataTableModule} from "@ismatjon/angular-data-table";

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
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {LoginComponent} from './login/login.component';
import {AuthService} from "./auth.service";
import {AuthGuardService} from "./auth-guard.service";
import {CheckOutComponent} from './check-out/check-out.component';
import {OrdersSuccessComponent} from './orders-success/orders-success.component';
import {ProductsComponent} from './products/products.component';
import {UserService} from "./user.service";
import {AdminAuthGuard} from "./admin-auth-guard.service";
import {ProductFormComponent} from './admin/product-form/product-form.component';
import {MatRadioModule} from "@angular/material/radio";
import {CategoryService} from "./category.service";
import {ProductService} from "./product.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    ShoppingCartComponent,
    OrdersComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    LoginComponent,
    CheckOutComponent,
    OrdersSuccessComponent,
    ProductsComponent,
    ProductFormComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
    AppRoutingModule,
    DataTableModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'shopping/cart',
        component: ShoppingCartComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },


      {
        path: 'checkout',
        component: CheckOutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'order-success',
        component: OrdersSuccessComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'my/orders',
        component: OrdersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuard]
      },
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuard]
      },

      {
        path: '**',
        component: NotFoundComponent
      }
    ]),
    BrowserAnimationsModule,
    MaterialModule,
    MatRadioModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
