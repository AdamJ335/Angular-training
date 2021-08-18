import {ShoppingCart} from "./shopping-cart";

export class Order{
  datePlaced!: number;
  items!:any[];
  finalPrice = 0;

  constructor(public userId:string, public shipping: any, cart: ShoppingCart){
    this.datePlaced = new Date().getTime();

    this.items = cart.items.map(i=> {
      this.finalPrice += i.totalPrice;
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
}
