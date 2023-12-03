import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResultDetailsComponent } from './view-result-details.component';

describe('ViewResultDetailsComponent', () => {
  let component: ViewResultDetailsComponent;
  let fixture: ComponentFixture<ViewResultDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResultDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResultDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
