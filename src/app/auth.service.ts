import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    // @ts-ignore
    this.$user = afAuth.authState;
  }

  login(){
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then();
  }

  logout(){
    this.afAuth.signOut().then();
  }
}
