import {Component} from '@angular/core';
import {OrderService} from "shared/services/order.service";

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$:any;

  constructor(private orderService: OrderService) {
    this.orders$ = orderService.getOrders();
  }


}
