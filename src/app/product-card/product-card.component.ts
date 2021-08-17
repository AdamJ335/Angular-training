import {Component, Input} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
  @Input('product') product: any;
  @Input('show-actions') showActions = true;
  cartId:any;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product:any){
    this.cartId = localStorage.getItem('cartId');
    if (!this.cartId) {
      this.cartService.create().then(result => {
        localStorage.setItem('cartId', <string>result.key);

        //Add product to cart
      });
    } else {
      //Add product to cart

    }
  }

}
