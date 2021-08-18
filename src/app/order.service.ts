import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {ShoppingCartService} from "./shopping-cart.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,
              private cartService: ShoppingCartService) { }

  async placeOrder(order:any) {
    let result = this.db.list('/orders').push(order);
    await this.cartService.clearCart();
    return result;
  }

  get(orderId: any) {
    return this.db.object('/orders/' + orderId)
      .valueChanges();
  }

  getOrders(){
    const productRef = this.db.list('/orders', ref => ref.orderByChild('datePlaced'));
    return productRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal()}));
    }));
  }
  getOrdersByUser(userId:any){
    const ordersRef = this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId));
    return ordersRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.exportVal()}));
    }));
  }

  private documentToDomainObject = (c: any) => {
    const data = c.payload.exportVal();
    const id = c.key;
    return {id, data};
  }
}
