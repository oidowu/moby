import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

const ARTICLE_URL = '/api/Articles'

@Injectable()
export class ArticleService {

    constructor(private http: HttpClient) { }
    
    // list all articles in database
    public getArticles() : Observable<any[]> {
        return this.http.get<any[]>(ARTICLE_URL)
    }
}