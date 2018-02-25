import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {

  @Input() article
  private title
  private author
  private text

  constructor() { }

  ngOnInit() {
    this.title = this.article.title
    this.author = this.article.author
    this.text = this.article.text
  }

}
