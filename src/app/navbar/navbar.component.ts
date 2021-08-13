import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {AppUser} from "../models/app-user";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  appUser!: AppUser;
  constructor(private auth: AuthService) { }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      //console.log("appUser: " + appUser.name);
    });
  }

  logout(){
    this.auth.logout();
  }

  toggleAdmin(){
    this.appUser.isAdmin = !!document.getElementById('adminSwitch');
  }

  // addToDBTest(){
  //   let test = this.db.object('/test/').update({
  //     name: "Testing",
  //     id: 1
  //   }).then();
  //   console.log(test);
  // }

}
