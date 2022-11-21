import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NormalNewComponent } from './shared/components/normal-new/normal-new.component';
import { SlideshowNewComponent } from './shared/components/slideshow-new/slideshow-new.component';
import { AddNewsComponent } from './shared/components/add-news/add-news.component';
import { ContentTemplateDirective } from './shared/directives/content-template.directive';

import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NormalNewComponent,
    SlideshowNewComponent,
    ContentTemplateDirective,
    AddNewsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    ScrollPanelModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    ChipsModule,
    InputTextareaModule,
    DynamicDialogModule,
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
