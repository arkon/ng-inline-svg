import { NgModule, ModuleWithProviders } from '@angular/core';

import { InlineSVGComponent } from './inline-svg.component';
import { InlineSVGConfig, InlineSVGDefaultConfig } from './inline-svg.config';
import { InlineSVGDirective } from './inline-svg.directive';
import { SVGCacheService } from './svg-cache.service';

@NgModule({
  declarations: [InlineSVGDirective, InlineSVGComponent],
  exports: [InlineSVGDirective],
  providers: [
    SVGCacheService,
    { provide: InlineSVGConfig, useClass: InlineSVGDefaultConfig },
  ],
  entryComponents: [InlineSVGComponent]
})
export class InlineSVGModule {
  static forRoot(config: InlineSVGConfig): ModuleWithProviders {
    return {
      ngModule: InlineSVGModule,
      providers: [
        { provide: InlineSVGConfig, useValue: config }
      ]
    };
  }
}
