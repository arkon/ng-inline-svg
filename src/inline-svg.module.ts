import { NgModule, ModuleWithProviders } from '@angular/core';

import { InlineSVGComponent } from './inline-svg.component';
import { InlineSVGConfig } from './inline-svg.config';
import { InlineSVGDirective } from './inline-svg.directive';

@NgModule({
  declarations: [InlineSVGDirective, InlineSVGComponent],
  exports: [InlineSVGDirective],
  entryComponents: [InlineSVGComponent]
})
export class InlineSVGModule {
  static forRoot(config?: InlineSVGConfig): ModuleWithProviders {
    return {
      ngModule: InlineSVGModule,
      providers: [
        { provide: InlineSVGConfig, useValue: config }
      ]
    };
  }
}
