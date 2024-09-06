import { Injectable, Renderer2, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor() { }

  smoothScroll(target: string, el: ElementRef) {
    const element = el.nativeElement.querySelector(target);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = elementPosition - startPosition;
      const duration = 2000;
      let start: number | null = null;
  
      const animationScroll = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
  
        if (timeElapsed < duration) {
          requestAnimationFrame(animationScroll);
        }
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

  // showTooltip(event: MouseEvent, tooltipId: string, renderer: Renderer2, el: ElementRef) {
  //   const tooltip = el.nativeElement.querySelector(`#${tooltipId}`);
  //   if (tooltip) {
  //     const rect = (event.target as HTMLElement).getBoundingClientRect();
  //     renderer.setStyle(tooltip, 'left', `${rect.left}px`);
  //     renderer.setStyle(tooltip, 'top', `${rect.bottom + window.scrollY}px`);
  //     renderer.setStyle(tooltip, 'display', 'block');
  //   }
  // }

//   showTooltip(event: MouseEvent, tooltipId: string, renderer: Renderer2, el: ElementRef) {
//     const tooltip = el.nativeElement.querySelector(`#${tooltipId}`);
//     console.log('Tooltip element:', tooltip); 

//     if (tooltip) {
//         const rect = (event.target as HTMLElement).getBoundingClientRect();
//         renderer.setStyle(tooltip, 'left', `${rect.left + window.scrollX}px`); // スクロール位置を考慮
//         renderer.setStyle(tooltip, 'top', `${rect.bottom + 10 + window.scrollY}px`); // 10px下に配置
//         renderer.setStyle(tooltip, 'display', 'block');
//         console.log('Tooltip displayed with styles:', window.getComputedStyle(tooltip)); // 追加部分

//     } else {
//       console.warn('Tooltip not found for ID:', tooltipId); // 警告を追加
//     }
// }
  
// showTooltip(event: MouseEvent, tooltipId: string, renderer: Renderer2, el: ElementRef) {
//   console.log(`Tooltip requested for: ${tooltipId}`);
//   const tooltip = el.nativeElement.querySelector(`#${tooltipId}`);
  
//   if (tooltip) {
//     const targetElement = event.target as HTMLElement;
//     const rect = targetElement.getBoundingClientRect();
//     console.log('Target Rect:', rect); // クリックされた要素の位置情報

//     // スクロールオフセットを取得
//     const scrollX = window.scrollX || window.pageXOffset; // 水平方向のスクロール量
//     const scrollY = window.scrollY || window.pageYOffset; // 垂直方向のスクロール量
//     console.log('Scroll Offsets:', scrollX, scrollY); // スクロールオフセットの情報

//     // ツールチップの表示位置を計算
//     const adjustedLeft = rect.left + scrollX; // X座標の調整
//     const adjustedTop = rect.bottom + scrollY; // Y座標の調整
//     console.log('Tooltip Position (Adjusted):', adjustedLeft, adjustedTop); // 調整後の位置を表示

//     // CSSスタイルの適用
//     renderer.setStyle(tooltip, 'left', `${adjustedLeft}px`);
//     renderer.setStyle(tooltip, 'top', `${adjustedTop}px`);
//     renderer.setStyle(tooltip, 'display', 'block'); // ツールチップを表示
//   } else {
//     console.error(`Tooltip with id ${tooltipId} not found.`);
//   }
// }

showTooltip(event: MouseEvent, tooltipId: string, renderer: Renderer2, el: ElementRef) {
  const tooltip = el.nativeElement.querySelector(`#${tooltipId}`);
  if (tooltip) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const parentRect = (event.target as HTMLElement).offsetParent?.getBoundingClientRect();
      
      if (!parentRect) return; // 親要素の情報がない場合は終了

      let leftPosition = rect.left + window.scrollX;
      let topPosition = rect.bottom + window.scrollY;

      // ツールチップが親要素の左端を超える場合の調整
      if (leftPosition + tooltip.offsetWidth > parentRect.right) {
          leftPosition = parentRect.right - tooltip.offsetWidth - 10; // 10px のマージンを追加
      }

      // ツールチップが親要素の右端を超える場合の調整
      if (leftPosition < parentRect.left) {
          leftPosition = parentRect.left + 10; // 10px のマージンを追加
      }

      // スタイルを適用
      renderer.setStyle(tooltip, 'left', `${leftPosition}px`);
      renderer.setStyle(tooltip, 'top', `${topPosition}px`);
      renderer.setStyle(tooltip, 'display', 'block');
  }
}

  hideTooltip(renderer: Renderer2, el: ElementRef) {
    const tooltips = el.nativeElement.querySelectorAll('.tooltip');
    tooltips.forEach((tooltip: HTMLElement) => {
      renderer.setStyle(tooltip, 'display', 'none');
      console.log('Tooltip hidden:', tooltip); // 追加部分

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