import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    //this.route.paramMap['id']

    this.route.paramMap
      .subscribe(params => {
        let id = params.get('id') as unknown as number;
        console.log(id);
      });
  }

}
