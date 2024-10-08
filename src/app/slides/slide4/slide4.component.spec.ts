import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slide4Component } from './slide4.component';

describe('Slide4Component', () => {
  let component: Slide4Component;
  let fixture: ComponentFixture<Slide4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Slide4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Slide4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
