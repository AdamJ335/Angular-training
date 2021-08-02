import {Component, OnInit} from '@angular/core';
import {FollowerService} from "../services/follower.service";
import {ActivatedRoute} from "@angular/router";
import {combineLatest} from 'rxjs';

@Component({
  selector: 'followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: FollowerService) { }

  ngOnInit(): void {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).subscribe(combined => {
      let id = combined[0].get('id');
      let page = combined[1].get('page');

      //this.service.getAll({id: id, page: page});
      this.service.getAll()
        .subscribe(followers =>
          this.followers = followers as any[]);
    });

  }

}
