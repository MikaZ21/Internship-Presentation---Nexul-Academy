import { Component, ElementRef } from '@angular/core';
import { Service } from 'src/app/service.service';

@Component({
  selector: 'app-slide3',
  templateUrl: './slide3.component.html',
  styleUrls: ['./slide3.component.scss']
})
export class Slide3Component {
  constructor(
    private service: Service, 
    private el: ElementRef, 
  ) {}

  smoothScroll(target: string) {
    this.service.smoothScroll(target, this.el);
  }
}
