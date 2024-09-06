import { Component, ElementRef } from '@angular/core';
import { Service } from 'src/app/service.service';

@Component({
  selector: 'app-slide2',
  templateUrl: './slide2.component.html',
  styleUrls: ['./slide2.component.scss']
})
export class Slide2Component {
  constructor(
    private service: Service, 
    private el: ElementRef
  ) {}

  smoothScroll(target: string) {
    this.service.smoothScroll(target, this.el);
  }
}
