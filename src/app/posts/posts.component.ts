import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  posts: any[] = [];
  private url = 'http://jsonplaceholder.typicode.com/posts';

  ngOnInit(){
    this.service.getPosts()
      .subscribe((response) => {
        this.posts = response as any[];
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
      });
  }

  updatePost(post: any){
    this.service.updatePost(post)
      .subscribe(response => {
        console.log(response);
      });
  }
  deletePost(post: any){
    this.service.deletePost(post.id)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
  }

}
