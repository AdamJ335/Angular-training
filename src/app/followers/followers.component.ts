import {Component, OnInit} from '@angular/core';
import {FollowerService} from "../services/follower.service";

@Component({
  selector: 'followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers: any[] = [];

  constructor(private service: FollowerService) { }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(followers =>
        this.followers = followers as any[])
  }

}
