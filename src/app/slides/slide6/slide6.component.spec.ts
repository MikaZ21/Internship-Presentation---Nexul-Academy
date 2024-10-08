import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slide6Component } from './slide6.component';

describe('Slide6Component', () => {
  let component: Slide6Component;
  let fixture: ComponentFixture<Slide6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slide6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Slide6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
