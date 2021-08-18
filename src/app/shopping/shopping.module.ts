import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthGuardService} from 'shared/services/auth-guard.service';
import {SharedModule} from 'shared/shared.module';

import {CheckOutComponent} from './components/check-out/check-out.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';
import {OrderDetailsComponent} from './components/order-details/order-details.component';
import {OrdersSuccessComponent} from './components/orders-success/orders-success.component';
import {ProductFilterComponent} from './components/products/product-filter/product-filter.component';
import {ProductsComponent} from './components/products/products.component';
import {ShippingFormComponent} from './components/shipping-form/shipping-form.component';
import {ShoppingCartSummaryComponent} from './components/shopping-cart-summary/shopping-cart-summary.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    ShoppingCartComponent,
    CheckOutComponent,
    MyOrdersComponent,
    OrdersSuccessComponent,
    ProductsComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderDetailsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent
      },
      {
        path: 'checkout',
        component: CheckOutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'order-success/:id',
        component: OrdersSuccessComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'orders/:id',
        component: OrdersSuccessComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'my/orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuardService]
      },
    ])

  ]
})
export class ShoppingModule { }
