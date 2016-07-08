import { Component } from '@angular/core';
import { StickyElement } from 'ng2-sticky-element';

@Component({
  selector: 'demo',
  directives: [StickyElement],
  template: `
    <div class="test"></div>
    <div [sticky]="'.test'">Sticky</div>
  `
})
export class DemoComponent {
}
