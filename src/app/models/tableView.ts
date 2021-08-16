import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

export class TableView {
  displayedColumns: any[];
  dataSource: MatTableDataSource<any>;

  constructor(displayedColumns: any[]) {
    this.displayedColumns = displayedColumns;
    this.dataSource = new MatTableDataSource<any>();
  }

  init(dataArray: any[], sort: MatSort) {
    this.dataSource.data = dataArray;
    this.dataSource.sort = sort;
  }

  initFilter() {
    this.dataSource.filterPredicate = (prod: any, filter: string) => {
      return !filter || prod.data.title.toLowerCase().includes(filter);
    };
  }

  afterViewInit(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        default: return item.data[property];
      }
    }
  }

  applyFilter(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();
  }
}
