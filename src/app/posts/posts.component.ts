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
    this.service.getAll()
      .subscribe((posts) => {
        this.posts = posts as any[];
      });
  }
  constructor(private service: PostService) {
  }


  createPost(input: HTMLInputElement) {
    let post: any = {title: input.value};
    this.posts.splice(0, 0, post);
    input.value = '';
    this.service.create(post)
      .subscribe(newPost => {
        post['id'] = newPost;
        //console.log(response);
      },(error: AppError) => {
        this.posts.splice(0, 1);
        if(error instanceof BadInput){
           //this.form.setErrors(error.originalError)
        } else {
          throw error;
        }

      });
  }

  updatePost(post: any){
    this.service.update(post)
      .subscribe(updatedPost => {
        console.log(updatedPost);
      });
  }
  deletePost(post: any){
    let index = this.posts.indexOf(post);
    (this.posts as any[]).splice(index, 1);
    //this.service.delete('')
    this.service.delete(post.id)
      .subscribe(null,
        (error: AppError) => {
        (this.posts as any[]).splice(index, 0,post);
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
