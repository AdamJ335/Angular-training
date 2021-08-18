import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "shared/services/user.service";
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId!: any;
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private userService: UserService) {
    // @ts-ignore
    this.user$ = afAuth.authState;
    // this.user$.subscribe(user =>
    //   console.log("User$ : " + user.uid)
    // );

  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then();
  }

  logout(){
    this.afAuth.signOut().then();
  }

  get appUser$(): Observable<any> {
    return this.user$.pipe(
      switchMap(user => {
        if(user) {
          this.userId = user.uid;
          return this.userService.get(user.uid);
        }
        else {return of(null)}
      })
    );
}
}
