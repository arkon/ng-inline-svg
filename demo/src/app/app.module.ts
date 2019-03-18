import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DemoComponent } from './app.component';
import { InlineSVGModule } from '../../../ng-inline-svg/src/lib/inline-svg.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InlineSVGModule.forRoot()
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class AppModule { }
