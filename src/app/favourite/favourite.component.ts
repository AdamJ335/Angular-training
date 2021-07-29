import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FavouriteComponent {
  @Input('isFavourite') isSelected = false;
  @Output('change') click = new EventEmitter();

  onClick(){
    this.isSelected = !this.isSelected;
    this.click.emit({newValue: this.isSelected});
  }

}

export interface FavouriteChangedEventArgs {
  newValue: boolean
}
