import { Component, Input, OnInit } from '@angular/core';
import { NewsComponent } from '../../models/news-component.model';
import { NormalNew } from '../../models/news.model';

@Component({
  selector: 'app-normal-new',
  templateUrl: './normal-new.component.html',
  styleUrls: ['./normal-new.component.scss']
})
export class NormalNewComponent implements OnInit, NewsComponent {

  @Input() data?: NormalNew;
  
  constructor( ) {
  }

  ngOnInit(): void {
  }

}
