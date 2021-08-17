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


  constructor(private cartService: ShoppingCartService) { }

  addToCart(){
    console.log("addToCart this.id: " + this.id);
    this.cartService.addToCart(this.product, this.id).then();

  }

}
