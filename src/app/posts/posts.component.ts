import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {AppError} from "../common/app-error";
import {NotFoundError} from "../common/not-found-error";
import {BadInput} from "../common/bad-input";

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  posts: any[] = [];

  ngOnInit(){
    this.service.getPosts()
      .subscribe((response) => {
        this.posts = response as any[];
      },error => {
        alert("An unexpected error occured.");
        console.log(error);
      })
  }
  constructor(private service: PostService) {
  }


  createPost(input: HTMLInputElement) {
    let post: any = {title: input.value};
    this.service.createPost(post)
      .subscribe(response => {
        post.id = response;
        this.posts.splice(0, 0, post);
        //console.log(response);
      },(error: AppError) => {
        if(error instanceof BadInput){
           //this.form.setErrors(error.originalError)
        } else {
          alert("An unexpected error occured.");
          console.log(error);
        }
      });
  }

  updatePost(post: any){
    this.service.updatePost(post)
      .subscribe(response => {
        console.log(response);
      },(error: Response) => {
        alert("An unexpected error occured.");
        console.log(error);
      });
  }
  deletePost(post: any){
    //this.service.deletePost(321321321321425)
    this.service.deletePost(post.id)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);

      },(error: AppError) => {
        if(error instanceof NotFoundError){
          alert("This post has already been deleted");
        } else {
          alert("An unexpected error occured.");
          console.log(error);
        }

      });
  }

}
