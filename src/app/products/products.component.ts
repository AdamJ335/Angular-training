import {Component} from '@angular/core';
import {ProductService} from "../product.service";
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$;
  categories$

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private categoryService: CategoryService) {
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();
  }


}
