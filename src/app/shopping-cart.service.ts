import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Product} from "./models/product";
import {map, take} from "rxjs/operators";
import {ShoppingCart} from "./models/shopping-cart";
import {Observable} from "rxjs";

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

  async getCart(): Promise<Observable<ShoppingCart>>{
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(
        map((x:any) => {
          // console.log(x);
          //console.log(x.payload.val()['items']);
          // console.log(x.payload.val().items);
          //const items = x.items;
          return new ShoppingCart(x.payload.exportVal().items);
        })
      );
  }

  async addToCart(product: Product, productId: any){
    //console.log("addToCard productId: " + productId);
    await this.updateQuantityItem(product, productId, 1);
  }
  async removeFromCart(product: Product, productId: any){
    await this.updateQuantityItem(product, productId, -1);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if(cartId){ return cartId; }

    let result = await this.create();
    localStorage.setItem('cartId', result.key as string);
    return result.key as string;



  }
  private getItem(cartId:any, productId:string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async updateQuantityItem(product:Product, productId:any, change:number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, productId);
    //console.log(productId);
    item$.snapshotChanges().pipe(take(1)).subscribe(i => {
      let data = i.payload.exportVal();
      let item = this.getItem(cartId, productId);
      let newQuantity = (data && data.quantity || 0) + change;

      if(newQuantity === 0){ item.remove();}
      else{item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: newQuantity
      });
      }

    });
  }
}
