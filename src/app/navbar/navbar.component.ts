import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {AppUser} from "../models/app-user";
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  shoppingCartItemCount!:number;
  appUser!: AppUser;
  constructor(private auth: AuthService, private cartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      //console.log("appUser: " + appUser.name);
    });
    const cart$ = await this.cartService.getCart();
    cart$.snapshotChanges().subscribe(cart=> {
      this.shoppingCartItemCount = 0;
      // @ts-ignore
      const items = cart.payload.val().items;
      for (let productId in items) {
       this.shoppingCartItemCount += items[productId].quantity;
      }
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
