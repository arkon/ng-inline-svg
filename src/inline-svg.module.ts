import { NgModule, ModuleWithProviders } from '@angular/core';

import { InlineSVGComponent } from './inline-svg.component';
import { InlineSVGConfig } from './inline-svg.config';
import { InlineSVGDirective } from './inline-svg.directive';
import { SVGCacheService } from './svg-cache.service';
import { InlineSVGService } from './inline-svg.service';

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
        InlineSVGService,
        SVGCacheService,
        { provide: InlineSVGConfig, useValue: config }
      ]
    };
  }
}
