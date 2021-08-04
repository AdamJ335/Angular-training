import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";


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

}
