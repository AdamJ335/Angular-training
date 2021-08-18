import {ShoppingCartItem} from "./shopping-cart-item";

export class ShoppingCart {

  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for(let productId in itemsMap){
      let item = itemsMap[productId]
      this.items.push(new ShoppingCartItem({...item, $key: productId}));
    }
  }


  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) {
      count += this.items[productId].quantity;
    }
    return count;
  }
  getQuantity(productId:string){
    let item = this.itemsMap[productId];
    return item ? item.quantity: 0;
  }
}
