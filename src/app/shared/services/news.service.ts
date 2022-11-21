import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap, tap, startWith } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NormalNewComponent } from '../components/normal-new/normal-new.component';
import { SlideshowNewComponent } from '../components/slideshow-new/slideshow-new.component';
import { NewsTypes } from '../enums/news-types.enum';
import { NewsModel } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl: string = environment.backendUrl.concat('/news');
  private getNews$ = new Subject<void>();
  private getNewsObservable: Observable<NewsModel[]> = this.getNews$.pipe(
    startWith({}),
    switchMap(() => {
      return this.http.get<NewsModel[]>(this.apiUrl)
    })
  );
  
  constructor(private http: HttpClient) {}

  private componentByType(type: NewsTypes) {
    switch(type) {
      default:
      case NewsTypes.NORMAL: return NormalNewComponent;
      case NewsTypes.SLIDESHOW: return SlideshowNewComponent;
    }
  }

  getNews(): Observable<NewsModel[]> {
    return this.getNewsObservable;
  }

  getNewsComponent(data: NewsModel) {
    return {
      component: this.componentByType(data.type),
      data: data
    }
    
  }

  sampleData = {
    "data": {
      "title": "normal document",
      "text": "slideshow document text",
      "tags": [],
      "type": "normal",
      "imageUrl": "https://www.rdstation.com/blog/wp-content/uploads/sites/2/2017/09/thestocks.jpg"
    }
  };

  postNew(data: NewsModel): Observable<NewsModel> {
    return this.http.post<NewsModel>(this.apiUrl, { data })
    .pipe(tap(() => {
      this.getNews$.next();
    }));
  }
}
