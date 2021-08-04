import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoursesComponent} from './courses.component';
import {CoursesService} from './services/courses.service';
import {AuthorService} from './services/author.service';
import {SummaryPipe} from './summary.pipe';
import {InputFormatDirective} from './input-format.directive';
import {HttpClientModule} from "@angular/common/http";
import {PostService} from "./services/post.service";
import {FollowersComponent} from './followers/followers.component';
import {FollowerService} from "./services/follower.service";
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    SummaryPipe,
    InputFormatDirective,
    FollowersComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'followers',
        component: FollowersComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  providers: [
    CoursesService,
    AuthorService,
    PostService,
    FollowerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
