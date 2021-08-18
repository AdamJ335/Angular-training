import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {MaterialModule} from "../added-modules/material.module";


@NgModule({
  declarations: [
    NavbarComponent,
    NotFoundComponent,
    LoginComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        MaterialModule
    ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
