import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  product:any;
  shipping:any = {};

  constructor() { }

  ngOnInit(): void {
  }

  placeOrder() {
    console.log(this.shipping);
  }
}
