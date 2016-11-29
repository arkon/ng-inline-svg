import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { InlineSVGDirective } from './inline-svg.directive';

@NgModule({
  declarations: [InlineSVGDirective],
  imports: [HttpModule],
  exports: [InlineSVGDirective]
})
export class InlineSVGModule {}
