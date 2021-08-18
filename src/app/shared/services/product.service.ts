import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any){
    this.db.list('/products').push(product);
  }
  getAll(){

    return this.db.list('/products')
      .snapshotChanges()
      .pipe(map(actions => actions.
        map(this.documentToDomainObject)));
  }
  private documentToDomainObject = (c: any) => {
    const data = c.payload.exportVal();
    const id = c.key;
    return {id, data};
  }

  getProduct(productId:any){
    return this.db.object('/products/' + productId);
  }

  update(productId:any, product:any){
    return this.db.object('/products/' + productId).update(product).then();
  }
  delete(productId:any){
    return this.db.object('/products/' + productId).remove().then();
  }
}
