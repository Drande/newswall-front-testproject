import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowNewComponent } from './slideshow-new.component';

describe('SlideshowNewComponent', () => {
  let component: SlideshowNewComponent;
  let fixture: ComponentFixture<SlideshowNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideshowNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideshowNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
