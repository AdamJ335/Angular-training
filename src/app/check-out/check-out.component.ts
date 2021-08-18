import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart.service";
import {ShoppingCart} from "../models/shopping-cart";
import {Subscription} from "rxjs";
import {OrderService} from "../order.service";
import {AuthService} from "../auth.service";
import {Order} from "../models/order";
import {Router} from "@angular/router";

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{
  product:any;
  shipping:any = {};
  cart!: ShoppingCart;
  cartSubscription!: Subscription;
  userId!: string;
  userSubscription!: Subscription;

  constructor(private router: Router,
              private authService: AuthService,
              private cartService: ShoppingCartService,
              private orderService: OrderService) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
  async placeOrder() {
    // console.log(this.shipping);
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    await this.router.navigate(['/order-success', result.key]);

  }
}
