import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

const articleUrl = '/Articles'

@Injectable()
export class ArticleService {

    constructor(private http: Http) { }
    
    private getArticles() {

    }
}