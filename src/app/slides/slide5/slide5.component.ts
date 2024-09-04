import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Service } from '../../service.service';  // サービスをインポート

@Component({
  selector: 'app-slide5',
  templateUrl: './slide5.component.html',
  styleUrls: ['./slide5.component.scss']
})
export class Slide5Component {

  constructor(
    private service: Service, 
    private el: ElementRef, 
    private renderer: Renderer2) {}

    setupTooltips() {
      this.renderer.listen('window', 'click', (event: Event) => {
        const tooltip = this.el.nativeElement.querySelector('#codeTooltip');
        if (!event.target || !(event.target as HTMLElement).matches('.clickable-code') && !tooltip.contains(event.target as Node)) {
          this.service.hideTooltip(this.renderer, this.el); // Use service method
        }
      });
    }
  
    showTooltip(event: MouseEvent) {
      this.service.showTooltip(event, this.renderer, this.el); // Use service method
    }
  
    hideTooltip() {
      this.service.hideTooltip(this.renderer, this.el); // Use service method
    }
  }