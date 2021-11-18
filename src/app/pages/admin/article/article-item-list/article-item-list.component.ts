import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-item-list',
  templateUrl: './article-item-list.component.html',
  styleUrls: ['./article-item-list.component.scss']
})
export class ArticleItemListComponent implements OnInit {
  articlePublies: any[] = [];
  @Output() onDataLoaded: EventEmitter<Article[]> = new EventEmitter();

  constructor(private articleServ: ArticleService) { }

  ngOnInit() {
    this.findArticlePublie();
  }

  findArticlePublie(){
    this.articleServ.findArticlePublie()
      .subscribe((data: any)=>{
          this.articlePublies = data;
          this.onDataLoaded.emit(this.articlePublies);
      },(err)=>{
          this.articleServ.httpSrv.handleError(err);
      })
  }

}
