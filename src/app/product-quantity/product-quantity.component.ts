import {Component, Input} from '@angular/core';
import {ShoppingCart} from "../models/shopping-cart";
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product!: any;
  @Input('id') id!: string;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;


  constructor(private cartService: ShoppingCartService) { }

  addToCart(){
    //console.log(this.id);
    this.cartService.addToCart(this.product,this.id).then();

  }
  removeFromCart(){
    this.cartService.removeFromCart(this.product, this.id).then();
  }


}
