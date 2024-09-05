// slide5.component.ts
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Service } from '../../service.service';

@Component({
  selector: 'app-slide5',
  templateUrl: './slide5.component.html',
  styleUrls: ['./slide5.component.scss']
})
export class Slide5Component {

  constructor(
    private service: Service, 
    private el: ElementRef, 
    private renderer: Renderer2) {
      this.setupTooltips();  // コンストラクタ内でツールチップ設定を初期化
    }

  setupTooltips() {
    this.renderer.listen('window', 'click', (event: Event) => {
      const tooltip = this.el.nativeElement.querySelector('#codeTooltip');
      const isClickableCode = (event.target as HTMLElement).matches('.clickable-code');

      if (!isClickableCode && !tooltip.contains(event.target as Node)) {
        this.service.hideTooltip(this.renderer, this.el);
      }
    });
  }

  showTooltip(event: MouseEvent) {
    this.service.showTooltip(event, this.renderer, this.el);  // サービスを呼び出してツールチップを表示
  }

  hideTooltip() {
    this.service.hideTooltip(this.renderer, this.el);  // サービスを呼び出してツールチップを非表示
  }
}