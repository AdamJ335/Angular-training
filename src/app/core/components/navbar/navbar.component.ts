import {Component, OnInit} from '@angular/core';
import {AuthService} from "shared/services/auth.service";
import {AppUser} from "shared/models/app-user";
import {ShoppingCartService} from "shared/services/shopping-cart.service";
import {Observable} from "rxjs";
import {ShoppingCart} from "shared/models/shopping-cart";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  cart$!: Observable<ShoppingCart>;
  appUser!: AppUser;
  constructor(private auth: AuthService, private cartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      //console.log("appUser: " + appUser.name);
    });
    this.cart$ = await this.cartService.getCart();
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
