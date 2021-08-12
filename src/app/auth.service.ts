import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AppUser} from "./models/app-user";
import {switchMap} from "rxjs/operators";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute,
              private userService: UserService) {
    // @ts-ignore
    this.$user = afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then();
  }

  logout(){
    this.afAuth.signOut().then();
  }

  get appUser$(): Observable<AppUser> {
    return this.$user.pipe(
      // @ts-ignore
      switchMap(user => this.userService.get(user.uid))
    );
}
}
