import {Component} from '@angular/core';
import {ProductService} from "../product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.products$ = productService.getAll();
  }


}
