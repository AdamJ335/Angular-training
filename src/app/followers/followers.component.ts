import {Component, OnInit} from '@angular/core';
import {FollowerService} from "../services/follower.service";
import {ActivatedRoute} from "@angular/router";
import {combineLatest} from 'rxjs';
import {switchMap} from 'rxjs/operators';

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
    ])
      .pipe(
        switchMap(
          combined => {
            //Required Parameters
            let id = combined[0].get('id');
            let location = combined[0].get('location');

            //Optional parameters
            let page = combined[1].get('page');
            let newest = combined[1].get('newest');
            let cheapest = combined[1].get('cheapest');

            //Followers data
            return this.service.getAll() as unknown as any[];

      }))
      .subscribe(followers => this.followers = followers);

  }

}
