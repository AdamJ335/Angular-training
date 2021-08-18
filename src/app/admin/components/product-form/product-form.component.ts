import {Component, OnInit} from '@angular/core';
import {CategoryService} from "shared/services/category.service";
import {ProductService} from "shared/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product:any;
  id;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService) {
    this.product = {};
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.productService.getProduct(this.id).valueChanges().pipe(take(1)).subscribe((p:any) => this.product = p);
    }

  }

  ngOnInit(): void {
  }

  save(product:any){
    if(this.id){
      this.productService.update(this.id, product).then();
    } else{
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']).then();
  }
  delete() {
    if (!confirm('Are you sure you want to delete this product?')) { return; }

    this.productService.delete(this.id).then();
    this.router.navigate(['/admin/products']).then();
  }

}
