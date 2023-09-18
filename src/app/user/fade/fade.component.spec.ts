import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeComponent } from './fade.component';

describe('FadeComponent', () => {
  let component: FadeComponent;
  let fixture: ComponentFixture<FadeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FadeComponent]
    });
    fixture = TestBed.createComponent(FadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
