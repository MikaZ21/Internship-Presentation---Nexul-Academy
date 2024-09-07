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
      // this.setupTooltips();  // コンストラクタ内でツールチップ設定を初期化
    }

  // setupTooltips() {
  //   this.renderer.listen('window', 'click', (event: Event) => {
  //     const tooltip = this.el.nativeElement.querySelector('#codeTooltip');
  //     const isClickableCode = (event.target as HTMLElement).matches('.clickable-code');

  //     if (!isClickableCode && !tooltip.contains(event.target as Node)) {
  //       this.service.hideTooltip(this.renderer, this.el);
  //     }
  //   });
  // }

  showTooltip(event: MouseEvent, tooltipId: string) {
    this.service.showTooltip(event, tooltipId, this.renderer, this.el);  // サービスを呼び出してツールチップを表示
  }

  hideTooltip() {
    this.service.hideTooltip(this.renderer, this.el);  // サービスを呼び出してツールチップを非表示
  }

  smoothScroll(target: string) {
    this.service.smoothScroll(target, this.el);
  }
  

  codeSnippet1 = `
  patchFormWithChecklist(checklist: ChecklistEditViewModel) {
    this.checklistForm.patchValue({
        title: checklist.title,
        description: checklist.description,
    });

    const items = checklist.items || [];
    items.forEach((item) => {
        this.addChecklistItem(item);  // 既存アイテムをフォームに追加
        console.log("Existing checklist item added and marked as touched.");
    });

    if (items.length === 0) {
        this.addChecklistItem(undefined);  // 空のリストにデフォルトアイテムを追加
    }

    console.log('Form patched with checklist:', this.checklistForm.value);
}

addChecklistItem(item?: ChecklistItemEditViewModel) {        
    const checklistItem = this.fb.group({
        checklistItemId: [item?.checklistItemId || ''],
        sequence: [item?.sequence || 0],
        itemText: [item?.itemText || '', [Validators.required, Validators.maxLength(200)]]
    });

    this.items.push(checklistItem);
    this.itemAdded$.next(this.itemAdded$.value + 1);

    console.log('Added checklist item field:', checklistItem.value);
    console.log('Form after adding item:', this.checklistForm.value);
    this.logFormStatus();
}
`;
}
