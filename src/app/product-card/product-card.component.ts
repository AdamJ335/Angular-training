import {Component, Input} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
  @Input('product') product: any;
  @Input('id') id!: string;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart:any;


  constructor(private cartService: ShoppingCartService) { }

  addToCart(productId:any){
    //console.log(this.id);
    this.cartService.addToCart(this.product, productId).then();

  }
  removeFromCart(productId:any){
    this.cartService.removeFromCart(this.product, productId).then();
  }

  getQuantity(){
    //console.log(this.product.id);
    if(!this.shoppingCart) { return 0 }
    let item = this.shoppingCart.items[this.product.id];
    return item ? item.quantity: 0;
  }

}
