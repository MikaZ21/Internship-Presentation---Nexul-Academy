import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Slide1Component } from './slides/slide1/slide1.component';
import { Slide2Component } from './slides/slide2/slide2.component';
import { Slide3Component } from './slides/slide3/slide3.component';
import { Slide4Component } from './slides/slide4/slide4.component';
import { Slide5Component } from './slides/slide5/slide5.component';
import { Slide6Component } from './slides/slide6/slide6.component';
import { Slide7Component } from './slides/slide7/slide7.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
@NgModule({
  declarations: [
    AppComponent,
    Slide1Component,
    Slide2Component,
    Slide3Component,
    Slide4Component,
    Slide5Component,
    Slide6Component,
    Slide7Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighlightModule,
],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          javascript: () => import('highlight.js/lib/languages/javascript')
        },
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
