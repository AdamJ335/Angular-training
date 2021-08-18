import {Component, Input} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart.service";
import {ShoppingCart} from "../models/shopping-cart";
import {Product} from "../models/product";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
  @Input('product') product!: Product;
  @Input('id') id!: string;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;


  constructor(private cartService: ShoppingCartService) { }

  addToCart(){
    //console.log(this.id);
    this.cartService.addToCart(this.product,this.id).then();

  }
  removeFromCart(productId:any){
    this.cartService.removeFromCart(this.product, productId).then();
  }



}
