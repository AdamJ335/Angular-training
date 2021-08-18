import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart.service";
import {ShoppingCart} from "../models/shopping-cart";
import {Subscription} from "rxjs";
import {OrderService} from "../order.service";

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{
  product:any;
  shipping:any = {};
  cart!: ShoppingCart;
  subscription!: Subscription;

  constructor(private cartService: ShoppingCartService,
              private orderService: OrderService) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  placeOrder() {
    // console.log(this.shipping);
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i=> {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price,
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    }
    this.orderService.storeOrder(order);

  }
}
