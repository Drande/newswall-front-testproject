import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalNewComponent } from './normal-new.component';

describe('NormalNewComponent', () => {
  let component: NormalNewComponent;
  let fixture: ComponentFixture<NormalNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
