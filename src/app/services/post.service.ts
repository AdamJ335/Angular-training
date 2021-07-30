import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from 'rxjs';
import {NotFoundError} from "../common/not-found-error";
import {AppError} from "../common/app-error";
import {BadInput} from "../common/bad-input";


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get(this.url);
  }

  createPost(post:any){
    return this.http.post(this.url + '/' + post.id, JSON.stringify(post)).pipe(
      catchError((error:HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(new BadInput(error));
        }
        return throwError(new AppError(error));
      })
    );
  }

  updatePost(post:any){
    return this.http.patch(this.url + '/' + post.id,
      JSON.stringify({isRead: true}));

  }
  deletePost(id:any){
    return this.http.delete(this.url + id).pipe(
      catchError((error:HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(new NotFoundError());
        }
        return throwError(new AppError(error));
      })
    );
  }
}
