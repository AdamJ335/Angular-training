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
      });
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
          throw error;
        }

      });
  }

  updatePost(post: any){
    this.service.updatePost(post)
      .subscribe(response => {
        console.log(response);
      });
  }
  deletePost(post: any){
    //this.service.deletePost('')
    this.service.deletePost(post.id)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);

      },(error: AppError) => {
        console.log(error instanceof NotFoundError);
        if(error instanceof NotFoundError){
          alert("This post has already been deleted");
          console.log(error);
        } else {
          throw error;
        }

      });
  }

}
