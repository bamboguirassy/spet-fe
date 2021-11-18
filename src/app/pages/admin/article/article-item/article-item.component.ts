import { ArticleService } from './../article.service';
import { Component, Input, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
  @Input() articlePublie: any;
  constructor() { }

  ngOnInit() {
  }

  

}
