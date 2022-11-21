import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[contentTemplate]'
})
export class ContentTemplateDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}