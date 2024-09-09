import { Component, ElementRef } from '@angular/core';
import { Service } from 'src/app/service.service';

@Component({
  selector: 'app-slide6',
  templateUrl: './slide6.component.html',
  styleUrl: './slide6.component.scss'
})
export class Slide6Component {
  constructor(
    private service: Service, 
    private el: ElementRef, 
  ) {}

  smoothScroll(target: string) {
    this.service.smoothScroll(target, this.el);
  }
}
