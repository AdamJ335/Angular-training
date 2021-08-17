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

  getAll() {
    return this.observableCategories$.pipe(
      map((changes) => {
        return changes.map((c:any) => ({key: c.payload.key, ...c.payload.val()}));
      })
    );
  }
}
