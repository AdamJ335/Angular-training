import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {ShoppingCartService} from "./shopping-cart.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,
              private cartService: ShoppingCartService) { }

  async storeOrder(order:any){
    let result = this.db.list('/orders').push(order);
    await this.cartService.clearCart();
    return result;
  }
}
