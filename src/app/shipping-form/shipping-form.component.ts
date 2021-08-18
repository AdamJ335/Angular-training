import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../models/order";
import {Subscription} from "rxjs";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {OrderService} from "../order.service";
import {ShoppingCart} from "../models/shopping-cart";

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart!: ShoppingCart;
  shipping:any = {};
  userId!: string;
  userSubscription!: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    // console.log(this.shipping);
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    await this.router.navigate(['/order-success', result.key]);

  }

}