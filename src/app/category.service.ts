import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  observableCategories$: Observable<any>

  constructor(private db: AngularFireDatabase) {
    this.observableCategories$ = this.db
      .list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges();
  }
  getCategories(): Observable<any> {
    return this.db.list('/categories',
      ref => ref.orderByChild('name'))
      .snapshotChanges().pipe(map(actions => actions.map(this.documentToDomainObject)));
  }
  documentToDomainObject = (c: any) => {
    const data = c.payload.exportVal();
    const id = c.key;
    return {id, data};
  }
}
