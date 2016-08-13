import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { InlineSVGModule } from 'ng2-inline-svg';

import { DemoComponent } from './demo/demo.component';

enableProdMode();

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, InlineSVGModule],
  bootstrap: [DemoComponent]
})
class DemoAppModule {}

platformBrowserDynamic().bootstrapModule(DemoAppModule);
