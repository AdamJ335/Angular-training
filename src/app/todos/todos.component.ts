import {Component} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    trigger('fade', [
      //state(),
      transition('void => *', [
        style({ opacity: 0}),
        animate(500)
      ]),

      transition('* => void', [
        animate(500,  style({opacity: 0}))
      ])
    ])
  ]
})
export class TodosComponent {
  items: any[] = [
    'Wash the dishes',
    'Call the accountant',
    'Apply for a car insurance'];

  addItem(input: HTMLInputElement) {
    this.items.splice(0, 0, input.value);
    input.value = '';
  }

  removeItem(item:any) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }
}
