import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Product} from "./models/product";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId:string){
    return this.db.object('/shopping-carts/' + cartId);
  }

  async addToCart(product: Product, productId: any){
    console.log("addToCard productId: " + productId);
    await this.updateItem(product, productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if(cartId){ return cartId; }

    let result = await this.create();
    localStorage.setItem('cartId', <any>result.key);
    return result.key;



  }
  private getItem(cartId:any, productId:string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async updateItem(product:Product, productId:any) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, productId);
    console.log(productId);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      let newQuantity = (item.payload.numChildren() || 0) + 1;
      item$.update({product: product, quantity: newQuantity});
    });
  }
}
