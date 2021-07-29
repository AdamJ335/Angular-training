
import{ Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector: 'courses',
    template: `
        {{course.title | summary:32}} <br/>
        {{course.students | number }} <br/>
        {{course.rating | number:'1.1-3'}} <br/>
        {{course.price | currency:'GBP'}} <br/>
        {{course.releaseDate | date: 'longDate'}} <br/>
    `
})
export class CoursesComponent {
    course = {
        title: "The complete Angular Course",
        rating: 4.96553,
        students: 3214,
        price: 59.99,
        releaseDate: new Date(2016, 3, 1) //months base 0
    }

}