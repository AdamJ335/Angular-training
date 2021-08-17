import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  products: any[] = [];
  filteredProducts: any[] = [];
  category: any;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {

  }

  async ngOnInit() {
    this.populateProducts();
}

  private populateProducts() {
    this.productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    }))
      .subscribe((params:any) => {
        this.category = params.get('category');
        //console.log(this.category);
        this.applyFilter();
      });

  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.data.category === this.category) :
      this.products;
  }

}
