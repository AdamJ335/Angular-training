import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  posts: any[] = [];
  private url = 'http://jsonplaceholder.typicode.com/posts';

  ngOnInit(){
    this.http.get(this.url)
      .subscribe((response) => {
        this.posts = response as any[];
      })
  }
  constructor(private http: HttpClient) {

  }

  createPost(input: HTMLInputElement) {
    let post: any = {title: input.value};
    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response => {
        post.id = response;
        this.posts.splice(0, 0, post);
        //console.log(response);
      });
  }

  updatePost(post: any){
    this.http.patch(this.url + '/' + post.id,
        JSON.stringify({isRead: true}))
      .subscribe(response => {
        console.log(response);
      });
  }
  deletePost(post: any){
    this.http.delete(this.url + '/' + post.id)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
  }

}
