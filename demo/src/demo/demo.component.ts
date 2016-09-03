import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo',
  template: `
    <div class="demo-svg1" aria-label="My icon 1" [inlineSVG]="'img/image.svg'"></div>
    <div class="demo-svg2" aria-label="My icon 2" [inlineSVG]="'img/image.svg'"></div>
    <div *ngIf="_showOther" class="demo-svg3" aria-label="My delayed icon" [inlineSVG]="'img/image_with_fill.svg'" [removeSVGAttributes]="['fill']"></div>
  `
})
export class DemoComponent implements OnInit {
  private _showOther: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this._showOther = true;
    }, 100);
  }
}
