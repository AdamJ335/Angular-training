import {Component} from '@angular/core';
import {OrderService} from "shared/services/order.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  id: any;
  order$: Observable<any>;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.order$ = orderService.get(this.id);
  }


}
