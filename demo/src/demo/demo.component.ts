import { Component } from '@angular/core';
import InlineSVG from 'ng2-inline-svg';

@Component({
  selector: 'demo',
  directives: [InlineSVG],
  template: `
    <div class="demo-svg1" aria-label="My icon" [inlineSVG]="'img/image.svg'"></div>
    <div class="demo-svg2" aria-label="Another icon" [inlineSVG]="'img/image.svg'"></div>
  `
})
export class DemoComponent {
}