import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeChildComponent } from './welcome-child.component';

describe('WelcomeChildComponent', () => {
  let component: WelcomeChildComponent;
  let fixture: ComponentFixture<WelcomeChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
