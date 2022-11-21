import { Component, Input, OnInit } from '@angular/core';
import { NewsComponent } from '../../models/news-component.model';
import { SlideshowNew } from '../../models/news.model';

@Component({
  selector: 'app-slideshow-new',
  templateUrl: './slideshow-new.component.html',
  styleUrls: ['./slideshow-new.component.scss']
})
export class SlideshowNewComponent implements OnInit, NewsComponent {

  @Input() data?: SlideshowNew;
  constructor() {
    setInterval(() => {
      if(this.data) {
        this.currentSlide = (this.currentSlide + 1) % this.data?.slides.length;
      }
    }, 5000);
  }

  get previousSlide() {
    return (this.currentSlide - 1) % this.data!.slides.length;
  }

  get nextSlide() {
    return (this.currentSlide + 1) % this.data!.slides.length;
  }
  currentSlide: number = 0;

  ngOnInit(): void {
  }

}
