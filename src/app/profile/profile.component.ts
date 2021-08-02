import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private router:Router) { }

  submit(){
    this.router.navigate(['/followers'],{
      queryParams: {page: 1, order: 'newest'}
    });
  }

  // ngOnInit(): void {
  //   //this.route.paramMap['id']
  //
  //   this.route.paramMap
  //     .subscribe(params => {
  //       let id = params.get('id') as unknown as number;
  //       console.log(id);
  //     });
  // }

}
