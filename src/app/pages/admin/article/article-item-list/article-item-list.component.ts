import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-item-list',
  templateUrl: './article-item-list.component.html',
  styleUrls: ['./article-item-list.component.scss']
})
export class ArticleItemListComponent implements OnInit {
  articlePublies: any[] = [];

  constructor(private articleServ: ArticleService) { }

  ngOnInit() {
    this.findArticlePublie();
  }

  findArticlePublie(){
    this.articleServ.findArticlePublie()
      .subscribe((data: any)=>{
        console.log(data);
        
          this.articlePublies = data;
          //console.log('articles publies: '+ JSON.stringify(this.articlePublies));
      },(err)=>{
          console.log(err);
      })
  }

}
