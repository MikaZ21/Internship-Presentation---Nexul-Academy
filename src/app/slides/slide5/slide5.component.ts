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

  codeSnippet2 = `
      // アイテムの追加/削除を監視するためのBehaviorSubject
      this.itemAdded$ = new BehaviorSubject<number>(0);

      // フォームの値の変更をリアルタイムで監視し、アイテムの文字数を計算
      this.itemCharCounts$ = combineLatest([
          this.checklistForm.valueChanges.pipe(
              startWith({...this.checklistForm.value}), // 初期フォームの値でスタート
              distinctUntilChanged(), // フォームの値が変更された場合のみトリガー
          ), 
          this.itemAdded$ // アイテムの追加/削除のトリガー
      ]).pipe(
          map(([_formVal, _counter]) => { // フォームの現在の値とアイテム追加カウンターを監視
              let items = this.checklistForm.value.items as {itemText: string}[];
              return items.map(item => !item.itemText ? 0 : item.itemText.length); // 各アイテムの文字数を返す
          }),
      );
  `;

  codeSnippet3 = `
      // レッスン変更時にデータの再取得をトリガー
      private _lesson: Lesson | undefined | null;

      get lesson(): Lesson | undefined | null {
        return this._lesson;
      }

      @Input({required: true})
      set lesson(item: Lesson | undefined | null) {
        if (item) {
          this._lesson = item;
          // reload$を更新してコンポーネントのリフレッシュをトリガー
          this.reload$.next(this.reload$.value + 1);  
        }
      }
  `;

  codeSnippet3_2 = `
      // reload$というBehaviorSubjectを定義。初期値は0。
      // reload$はデータの再取得をトリガーするために使用されます。
      reload$ = new BehaviorSubject<number>(0); 

      // チェックリストデータを保持するObservable。
      // reload$の変更に基づいて、非同期でデータを取得し、UIを更新します。
      checklist$: Observable<ChecklistEditViewModel | null>;

      // レッスンデータを内部で保持するためのプライベート変数。
      // 外部から直接アクセスされないようにカプセル化されています。
      private _lesson: Lesson | undefined | null; 

      // レッスンデータを取得するためのゲッターメソッド。
      // 外部から現在のレッスン情報を参照する際に使用されます。
      get lesson(): Lesson | undefined | null {
        return this._lesson;
      }

      // 親コンポーネントからレッスンデータを受け取るためのセッターメソッド。
      // 新しいレッスンが設定された場合、内部プロパティに保存し、reload$の値を更新してデータの再取得をトリガーします。
      @Input({required: true})
      set lesson(item: Lesson | undefined | null) {
        if (item) {
          this._lesson = item; // 新しいレッスンを設定
          this.reload$.next(this.reload$.value + 1); // reload$の値をインクリメントし、データの再取得をトリガー
        }
      }

      // コンストラクタでChecklistServiceを注入し、checklist$ Observableを設定。
      // checklist$はreload$の値が変わるたびに、新しいデータを取得し、UIを更新するために使用されます。
      constructor(
        private checklistService: ChecklistService // チェックリストデータを取得するためのサービス
      ){
        // reload$の変更を監視し、データを非同期で取得
        this.checklist$ = this.reload$.pipe(
          // reload$の値が変わるたびに、新しいObservableを生成
          switchMap(_ => {
            const lessonId = this._lesson?.lessonId; // 現在のレッスンIDを取得
            if (lessonId) {
              // レッスンIDに基づいてチェックリストを取得
              return this.checklistService.getChecklistByLesson(lessonId); 
            } else {
              // レッスンIDがない場合、nullを返すObservableを返す
              return of(null); 
            }
          }),
          // 最新の結果をキャッシュし、複数の購読者で共有
          shareReplay(),
        );
    }  
  `;

  codeSnippet4 = `
    { // ルートがメインのコントロールを含むページ
      path: ':siteLinkedItemId/view/:pageId',  // siteLinkedItemIdとpageIdを含むパス
      component: CourseLayoutComponent,  // このパスに対応するコンポーネント
      children: [  // 子ルートを定義
        { // 表示されるページのコンテンツ（コースの概要またはレッスン）
          path: '',  // 空のパスでフルマッチさせる
          pathMatch: 'full',  // フルマッチのパスとして設定
          title: 'Lesson',  // ページのタイトル
          component: PageViewPageComponent  // このパスに対応するコンポーネント
        }
      ]
    }
`;

codeSnippet4_2 = `
    [HttpGet("by-page/{topicPageId}")]  // トピックページIDに基づいてコースを取得するエンドポイント
    public async Task<IActionResult> GetCourseByPage(string topicPageId)
    {
        var topicPage = await _pageData.GetPageAsync(topicPageId);  // トピックページを非同期で取得
        if (topicPage == null) return NotFound();  // トピックページが見つからない場合は404を返す

        var linkedItemId = topicPage.LinkedItemId;  // LinkedItemIdを取得
        if (linkedItemId.StartsWith("CRS", StringComparison.OrdinalIgnoreCase))  // LinkedItemIdがCRSで始まる場合
        {
            var course = await _courseData.GetAsync(linkedItemId);  // コースデータを取得
            if (course == null) return NotFound();  // コースが見つからない場合は404を返す

            var page = string.IsNullOrWhiteSpace(course.TopicPageId) ? null : await _pageData.GetPageWithContentAsync(course.TopicPageId);  // ページデータを取得
            var pageContent = string.IsNullOrWhiteSpace(course.TopicPageId) ? null : page.Content;  // ページのコンテンツを取得
            var courseModel = new CourseViewModel(course, page, pageContent);  // CourseViewModelを作成

            return Ok(courseModel);  // 200 OKレスポンスでコースモデルを返す
        }
        // レッスンの取得も同様に処理...
    }
`;

codeSnippet4_3 = `
    getPreviewUrl(site: Site, page: PageContentViewModel) {
      if (!page || !site || !site.siteLinkedItemId) return null; // 必要なデータが揃っていない場合は null を返す

      if (page.linkedItemId.startsWith('CRS') || page.linkedItemId.startsWith('SLS')) {  // linkedItemIdがCRSまたはSLSで始まる場合
        return this.env.environment.server + \`pages/\${page.siteLinkedItemId}/view/\${page.topicPageId}\`;  // Angularビュー用のURLを返す
      } else if (!this.env.environment.production) {  // 開発環境の場合
        return this.env.environment.server + page.slug + '?domain=' + site.subdomain;  // 開発環境用のURLを返す
      } else if (!!site.customDomain) {  // カスタムドメインがある場合
        return \`https://\${site.customDomain}/pages/\${page.siteLinkedItemId}/view/\${page.topicPageId}\`;  // カスタムドメイン用のURLを返す
      } else {  // サブドメインがある場合
        return \`https://\${site.siteLinkedItemId}.\${this.settingSvc.settings.productHost}/pages/\${page.siteLinkedItemId}/view/\${page.topicPageId}\`;  // サブドメイン用のURLを返す
      }
    }
`;

codeSnippet4_4 = `
    this.page$ = combineLatest([this.pageId$, this.userIsEditorPlus$, this.reload$]).pipe(
      tap(([_pageId, _isEditor, _]) => this.pageLoading$.next(true)),  // データのロードを開始（ローディング状態をtrueにする）
      switchMap(([pageId, isEditor, _]) => {  // pageIdとユーザーの権限に基づいてコンテンツを取得
        return !!pageId && pageId.match(/tpt/i)  // pageIdがテンプレートパターンにマッチする場合
          ? this.pageSvc.getTemplate(pageId)  // テンプレートを取得
          : this.pageSvc.getSingle(isEditor, pageId);  // 通常のページデータを取得
      }),
      shareReplay(),  // データをキャッシュして再利用
      tap((page) => {  // 取得したページデータを処理
        let pc = (page as PageContentViewModel);
        if (!!pc.topicPageId) {
          this.designSvc.beginDesignPage(pc);  // デザインページを開始
        }
        this.pageLoading$.next(false);  // データのロードが完了（ローディング状態をfalseにする）
      }),
      shareReplay(),  // 再利用のためにデータをキャッシュ
    );
`;
}