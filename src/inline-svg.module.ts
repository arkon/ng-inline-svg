import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { InlineSVGDirective } from './inline-svg.directive';
import { InlineSVGConfig, SVGCacheService } from './svg-cache.service';

@NgModule({
  declarations: [InlineSVGDirective],
  imports: [HttpModule],
  exports: [InlineSVGDirective],
  providers: [SVGCacheService]
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
