import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  task = {
    title: "Review applications",
    assignee: {
      name: "John Smith"
    }
  }
    //canSave = true;


  // courses:any;

  // loadCourses(){
  //   this.courses = [
  //     {id: 1, name: 'course1'},
  //     {id: 2, name: 'course2'},
  //     {id: 3, name: 'course3'}
  //   ];
  // }

  // trackCourse(index:number, course:any){
  //   return course ? course.id: undefined;
  // }

  // onAdd(){
  //   this.courses.push({id: 4, name: 'course4'});
  // }
  // onChange(course:any){
  //   course.name = "UPDATED";
  //   let index = this.courses.indexOf(course);
  //   this.courses.splice(index, 1);
  // }

  //viewMode = 'somethingElse';



  // post = {
  //   title: "Title",
  //   isFavourite: true
  // }
  // tweet = {
  //   body: '...',
  //   likesCount: 10,
  //   isLiked: true
  // }

  // onFavouriteChange(eventArgs: FavouriteChangedEventArgs) {
  //   console.log("Favourite changed: ", eventArgs);
  // }
}
