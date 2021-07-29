import { Component, Input } from '@angular/core';

@Component({
  selector: 'likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent {

  @Input('likesCount') likesCount = 0;
  @Input('isLiked') isLiked = false;

  onClick(){
    this.likesCount += (this.isLiked) ? -1: 1;
    this.isLiked = !this.isLiked;
    
  }

}
