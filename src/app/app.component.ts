import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Service } from 'src/app/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2, private service: Service) { }

  ngOnInit() {
    this.service.setupScrollToTopButton(this.el, this.renderer);
    this.setupSmoothScrolling();
  }

  setupSmoothScrolling() {
    const anchors = this.el.nativeElement.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor: any) => {
      this.renderer.listen(anchor, 'click', (event: Event) => {
        event.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = this.el.nativeElement.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}