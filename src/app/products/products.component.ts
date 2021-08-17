import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {ShoppingCartService} from "../shopping-cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {


  products: any[] = [];
  filteredProducts: any[] = [];
  category: any;
  cart:any;
  subscription!: Subscription;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: ShoppingCartService) {}


  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
      .subscribe(cart => this.cart = cart);
    this.populateProducts();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
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
