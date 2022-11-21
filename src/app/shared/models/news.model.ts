import { NewsTypes } from "../enums/news-types.enum";

interface BaseNewsModel {
  _id: string;
  title: string;
  text: string;
  tags: string[];
}

interface SlideshowNewSlides {
  title: string;
  imageUrl: string;
}

export interface NormalNew extends BaseNewsModel {
  type: NewsTypes.NORMAL;
  imageUrl: string;
}

export interface SlideshowNew extends BaseNewsModel {
  type: NewsTypes.SLIDESHOW;
  slides: SlideshowNewSlides[];
}

//Model used for better organization
interface NewsModels {
  normalNew : NormalNew;
  slideshowNew : SlideshowNew;
}

export type NewsModel = NewsModels[keyof NewsModels];