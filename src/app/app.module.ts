import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Slide1Component } from './slides/slide1/slide1.component';
import { Slide2Component } from './slides/slide2/slide2.component';
import { Slide3Component } from './slides/slide3/slide3.component';
import { Slide4Component } from './slides/slide4/slide4.component';
import { Slide5Component } from './slides/slide5/slide5.component';

@NgModule({
  declarations: [
    AppComponent,
    Slide1Component,
    Slide2Component,
    Slide3Component,
    Slide4Component,
    Slide5Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
