import { Component } from '@angular/core';
import InlineSVG from 'ng2-inline-svg';

@Component({
  selector: 'demo',
  directives: [InlineSVG],
  template: `
    <div class="demo-svg" [inline-svg]="'/img/image.svg'"></div>
  `
})
export class DemoComponent {
}