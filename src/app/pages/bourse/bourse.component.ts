import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bourse',
  templateUrl: './bourse.component.html',
  styleUrls: ['./bourse.component.scss']
})
export class BourseComponent implements OnInit {
  bourseData: any[];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.bourseData = this.activatedRoute.snapshot.data.bourseData;
  }

}
