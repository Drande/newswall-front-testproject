import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { NewsService } from '../shared/services/news.service';
import { ContentTemplateDirective } from '../shared/directives/content-template.directive';
import { NewsTypes } from '../shared/enums/news-types.enum';
import { NewsModel } from '../shared/models/news.model';
import { NewsComponent } from '../shared/models/news-component.model';
import { DialogService } from 'primeng/dynamicdialog';
import { AddNewsComponent } from '../shared/components/add-news/add-news.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  NewsTypes = NewsTypes;

  @ViewChild(ContentTemplateDirective, {static: true}) newsTemplate!: ContentTemplateDirective;
  
  onDestroy$: Subject<Boolean> = new Subject<Boolean>;
  news$ = this.newsService.getNews();

  constructor(
    private newsService: NewsService,
    public dialogService: DialogService
  ) {
    this.news$
    .pipe(
      takeUntil(this.onDestroy$)
    )
    .subscribe(news => {
      if(news.length > 0) {
        const mostRecentNew = news[0];
        this.setNew(mostRecentNew);
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy$.next(true)
  }

  setNew(newData: NewsModel) {
    this.newsTemplate.viewContainerRef.clear();
    const { component } = this.newsService.getNewsComponent(newData);
    const componentRef = this.newsTemplate.viewContainerRef.createComponent<NewsComponent>(component);
    componentRef.instance.data = newData;
  }

  createNew() {
    const ref = this.dialogService.open(AddNewsComponent, {
      header: "Plublish form",
      width: '90vw',
      height: '90vh',
      dismissableMask: true
    });

    ref.onClose
    .pipe(take(1))
    .subscribe((data?: NewsModel) => {
      if(data) {
        console.log(data);
        this.newsService.postNew(data)
        .pipe(
          tap({
            error: (err) => {
              //TODO: Handle error with message
              console.error(err);
            }
          })
        )
        .subscribe((res) => {
          //TODO: Notify about operation success
        });
      }
    });
  }

}
