// import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
// import { Service } from 'src/app/service.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent implements OnInit {

//   constructor(private el: ElementRef, private renderer: Renderer2, private service: Service) { }

//   ngOnInit() {
//     this.service.setupScrollToTopButton(this.el, this.renderer);
//     this.setupSmoothScrolling();
//   }

//   setupSmoothScrolling() {
//     const anchors = this.el.nativeElement.querySelectorAll('a[href^="#"]');
//     anchors.forEach((anchor: any) => {
//       this.renderer.listen(anchor, 'click', (event: Event) => {
//         event.preventDefault();
//         const targetId = anchor.getAttribute('href');
//         const targetElement = this.el.nativeElement.querySelector(targetId);
//         if (targetElement) {
//           targetElement.scrollIntoView({ behavior: 'smooth' });
//         }
//       });
//     });
//   }

//   scrollToTop() {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });

//     // スクロール完了後にボタンのスタイルをリセットする
//     setTimeout(() => {
//       const scrollUpButton = this.el.nativeElement.querySelector('.scroll-up-button button');
//       if (scrollUpButton) {
//         const isScrolledToFooter = window.scrollY + window.innerHeight >= document.body.offsetHeight - 100; // フッター付近にいるかを判定

//         if (!isScrolledToFooter) {
//           // フッター付近でなければ初期の半透明の水色に戻す
//           this.renderer.setStyle(scrollUpButton, 'background-color', 'rgba(173, 216, 230, 0.5)');
//           this.renderer.setStyle(scrollUpButton, 'color', 'var(--secondary-color)');
//           this.renderer.setStyle(scrollUpButton, 'border', '2px solid var(--secondary-color)');
//         }
//       }
//     }, 300); // スクロール完了後に少し遅延を与えてスタイルをリセット
//   }}


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