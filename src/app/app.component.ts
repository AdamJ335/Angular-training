import {Component} from '@angular/core';
import {AngularFireDatabase, AngularFireList, SnapshotAction} from "@angular/fire/database";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  courses$: Observable<any>;

  itemsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.itemsRef = db.list('courses');
    this.courses$ = this.itemsRef.snapshotChanges();

  }

  add(course: HTMLInputElement){
    this.itemsRef.push(course.value);
    course.value = '';
  }

  update(course: any){
    this.db.object('/courses/'+ course.key)
      .set((course as SnapshotAction<unknown>).payload.val() + ' UPDATED');
  }
  delete(course: any){
    this.db.object('/courses/'+ course.key)
      .remove()
      .then(x=> console.log('DELETED'))
  }
}
