import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs";
import {ProductService} from "../../product.service";
import {TableView} from "../../models/tableView";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  tableView!: TableView;
  subscription!: Subscription;
  displayedColumns = ['position', 'title', 'price' , 'edit'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.tableView = new TableView(this.displayedColumns);
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.tableView.init(products, this.sort);
      });

    this.tableView.initFilter();
  }

  ngAfterViewInit() {
    this.tableView.afterViewInit(this.paginator);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(query: string) {
    this.tableView.applyFilter(query);
  }

}
