import {Component} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  courses: Observable<any>;
  course: Observable<any>;
  author: Observable<any>;

  itemsRef: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {
    this.courses = db.list('/courses').valueChanges();
    this.course = db.object('/courses/1').valueChanges();
    this.author = db.object('/authors/1').valueChanges();

    this.itemsRef = db.list('courses');
  }

  add(course: HTMLInputElement){
    this.itemsRef.push({
      name: course.value,
      price: 150,
      isLive: true,
      sections: [
        {title: 'Components'},
        {title: 'Directives'},
        {title: 'Templates'},
      ]
    });
    course.value = '';
  }

}
