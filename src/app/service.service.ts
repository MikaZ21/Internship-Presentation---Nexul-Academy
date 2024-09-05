import { Injectable, Renderer2, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor() { }

  smoothScroll(target: string, el: ElementRef, renderer: Renderer2) {
    const element = el.nativeElement.querySelector(target);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const startPosition = window.scrollY;
      const distance = elementPosition;
      const duration = 1000;
      let start: number | null = null;

      const animationScroll = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) requestAnimationFrame(animationScroll);
      };

      requestAnimationFrame(animationScroll);
    }
  }

  easeInOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  showTooltip(event: MouseEvent, tooltipId: string, renderer: Renderer2, el: ElementRef) {
    const tooltip = el.nativeElement.querySelector(`#${tooltipId}`);
    if (tooltip) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      renderer.setStyle(tooltip, 'left', `${rect.left}px`);
      renderer.setStyle(tooltip, 'top', `${rect.bottom + window.scrollY}px`);
      renderer.setStyle(tooltip, 'display', 'block');
    }
  }
  
  hideTooltip(renderer: Renderer2, el: ElementRef) {
    const tooltips = el.nativeElement.querySelectorAll('.tooltip');
    tooltips.forEach((tooltip: HTMLElement) => {
      renderer.setStyle(tooltip, 'display', 'none');
    });
  }

  setupScrollToTopButton(el: ElementRef, renderer: Renderer2) {
    renderer.listen('window', 'scroll', () => {
      const scrollUpButton = el.nativeElement.querySelector('.scroll-up-button');
      const slide3 = el.nativeElement.querySelector('#slide3');
      
      if (slide3) {
        const middleOfSlide3 = slide3.offsetTop + (slide3.offsetHeight / 2);
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > middleOfSlide3) {
          renderer.setStyle(scrollUpButton, 'opacity', '1');
        } else {
          renderer.setStyle(scrollUpButton, 'opacity', '0');
        }
      }
    });
  }
}