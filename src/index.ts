import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import InlineSVGDirective from './inline-svg.directive';
import SVGCache from './svg-cache.service';

export { InlineSVGDirective };

@NgModule({
  declarations: [InlineSVGDirective],
  imports: [HttpModule],
  exports: [InlineSVGDirective],
  providers: [SVGCache]
})
export class InlineSVGModule {}
