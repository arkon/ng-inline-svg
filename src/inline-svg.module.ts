import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { InlineSVGComponent } from './inline-svg.component';
import { InlineSVGDirective } from './inline-svg.directive';
import { InlineSVGConfig, SVGCacheService } from './svg-cache.service';

@NgModule({
  declarations: [InlineSVGDirective, InlineSVGComponent],
  imports: [HttpClientModule],
  exports: [InlineSVGDirective],
  providers: [SVGCacheService],
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
