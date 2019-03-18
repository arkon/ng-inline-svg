import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo',
  template: `
    <div class="demo-svg1" aria-label="My icon 1" [inlineSVG]="'assets/image.svg'" (onSVGLoaded)="handleSVG()" [removeSVGAttributes]="['xmlns']"></div>
    <div class="demo-svg2" aria-label="My icon 2" [inlineSVG]="'assets/image.svg'" [replaceContents]="true">Content</div>
    <div *ngIf="_showOther" class="demo-svg3" aria-label="My delayed icon" [inlineSVG]="'assets/image_with_fill.svg'" [removeSVGAttributes]="['fill']"></div>
    <div [inlineSVG]="'assets/symbol.svg#fish'"></div>
    <div [inlineSVG]="'#fish'"></div>
    <div [inlineSVG]="'#fish'" [injectComponent]="true"></div>
    <div [inlineSVG]="'assets/nope.svg'" [fallbackImgUrl]="'https://nodei.co/npm/ng-inline-svg.png?compact=true'"></div>
  `
})
export class DemoComponent implements OnInit {
  _showOther: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this._showOther = true;
    }, 100);
  }

  handleSVG(svg: SVGElement, parent: Element | null): SVGElement {
    console.log('Loaded SVG: ', svg, parent);
    svg.setAttribute('width', '100');
    return svg;
  }
}
