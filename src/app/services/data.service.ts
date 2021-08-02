import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, retry} from "rxjs/operators";
import {throwError} from 'rxjs';
import {NotFoundError} from "../common/not-found-error";
import {AppError} from "../common/app-error";
import {BadInput} from "../common/bad-input";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject('string')private url:string, private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url)
      .pipe(map(response => response)
    );
  }

  create(resource:any){
    return this.http.post(this.url + '/' + resource.id, JSON.stringify(resource)).pipe(
      catchError((this.handleError)), map(response => response)
    );
  }

  update(resource:any){
    return this.http.patch(this.url + '/' + resource.id,
      JSON.stringify({isRead: true})).pipe(
      catchError((this.handleError)), map(response => response)
    );

  }
  delete(id:any){
    return this.http.delete(this.url + id).pipe(
      catchError((this.handleError)),
      map(response => response),
      retry(3)
    );//.toPromise();

  }

  private handleError(error:HttpErrorResponse){
    if (error.status === 404) {
      return throwError(new NotFoundError());
    } else if (error.status === 400) {
      return throwError(new BadInput(error));
    }
    return throwError(new AppError(error));
  }
}
