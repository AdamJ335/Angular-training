import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {AppUser} from "shared/models/app-user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: any){
    // this.db.object('/test/').update({
    //   test: "test"
    // }).then();

    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    }).then();
  }

  get(uid: string): Observable<AppUser>{
    return this.db.object('/users/' + uid).valueChanges() as Observable<AppUser>;
  }
}

