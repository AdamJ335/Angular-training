import {Injectable} from '@angular/core';
import {CanActivate} from "@angular/router";
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {AppUser} from "./models/app-user";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{


  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean>{
    return this.auth.appUser$.pipe(
      // @ts-ignore
      map((appUser:AppUser )=> appUser.isAdmin));

  }
}