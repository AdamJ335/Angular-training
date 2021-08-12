import {Component} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: firebase.User | null | undefined;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => this.user = user)
  }

  logout(){
    this.afAuth.signOut().then();
  }

}
