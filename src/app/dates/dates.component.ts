import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent implements OnInit {

  year: number | undefined;
  month: number | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let params = this.route.snapshot.paramMap;
    this.year = params.get('year') as unknown as number;
    this.month = params.get('month')as unknown as number;
  }

  viewAll(){
    this.router.navigate(['/']);
  }

}
