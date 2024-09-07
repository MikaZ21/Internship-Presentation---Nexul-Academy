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
    // チェックリストデータをフォームにパッチするメソッド
    patchFormWithChecklist(checklist: ChecklistEditViewModel) {

        // フォームのタイトルと説明フィールドを、チェックリストのデータで更新
        this.checklistForm.patchValue({
            title: checklist.title,
            description: checklist.description,
        });

        // チェックリストのアイテムを取得（存在しない場合は空のリストにする）
        const items = checklist.items || [];

        // 各アイテムをフォームに追加
        items.forEach((item) => {
            this.addChecklistItem(item);  // 既存アイテムをフォームに追加する関数の呼び出し
            console.log("Existing checklist item has been added, and the form has been updated.");
        });

        // アイテムが一つもない場合、デフォルトのアイテムをフォームに追加
        if (items.length === 0) {
            this.addChecklistItem(undefined);  // リストに空のデフォルトアイテムを追加
        }

        // フォームがパッチされたことをコンソールに出力
        console.log('Form patched with checklist:', this.checklistForm.value);
    }

    // 新しいチェックリストアイテムをフォームに追加するメソッド
    addChecklistItem(item?: ChecklistItemEditViewModel) {  

        // 新しいアイテムのフォームグループを作成
        const checklistItem = this.fb.group({
            checklistItemId: [item?.checklistItemId || ''],  // アイテムID(新規の場合は空)
            sequence: [item?.sequence || 0],  // アイテムの順序(新規の場合は0)
            itemText: [item?.itemText || '', [Validators.required, Validators.maxLength(200)]] // アイテムのテキスト（バリデーション付き）
        });

        // 作成したフォームグループをアイテムリストに追加
        this.items.push(checklistItem);

        // アイテムが追加されたことを通知するためのSubjectの値を更新
        this.itemAdded$.next(this.itemAdded$.value + 1);

        // 新しく追加されたアイテムと現在のフォームの状態をコンソールに出力
        console.log('Added checklist item field:', checklistItem.value);
        console.log('Form after adding item:', this.checklistForm.value);

        // 現在のフォームステータスをログ出力
        this.logFormStatus();
    }
  `;
}
