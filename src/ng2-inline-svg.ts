import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import SVGCache from './svg-cache';

@Directive({
  selector: '[inline-svg]',
  providers: [SVGCache]
})
export default class InlineSVG implements OnInit {
  @Input('inline-svg') url: string;
  @Input() cacheSVG: boolean = true;

  @Output() onSVGInserted: EventEmitter<SVGElement> = new EventEmitter<SVGElement>();

  constructor(private _el: ElementRef, private _svgCache: SVGCache) {
  }

  ngOnInit() {
    if (!this.url) {
      console.error('No URL passed to [inline-svg]!');
      return;
    }

    this._svgCache.getSVG(this.url, this.cacheSVG)
      .subscribe(
        (svg: SVGElement) => {
          if (svg) {
            this._el.nativeElement.innerHTML = svg;
            this.onSVGInserted.emit(svg);
          }
        },
        (err: any) => {
          console.error(err);
        }
      );
  }
}
