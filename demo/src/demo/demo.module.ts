import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { InlineSVGModule } from 'ng-inline-svg';

import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, HttpClientModule, InlineSVGModule.forRoot()],
  bootstrap: [DemoComponent]
})
export class DemoAppModule { }
