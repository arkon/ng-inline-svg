import { NgModule, enableProdMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { InlineSVGModule } from 'ng-inline-svg';

import { DemoComponent } from './demo/demo.component';

import './styles/styles.scss';

enableProdMode();

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, HttpClientModule, InlineSVGModule.forRoot()],
  bootstrap: [DemoComponent]
})
class DemoAppModule { }

platformBrowserDynamic().bootstrapModule(DemoAppModule);
