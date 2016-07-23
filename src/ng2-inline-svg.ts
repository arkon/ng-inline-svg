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

  @Output() onSVGInserted: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _el: ElementRef, private _svgCache: SVGCache) {
  }

  ngOnInit() {
    this._svgCache.getSVG(this.url)
      .subscribe(
        (svg) => {
          this._el.nativeElement.innerHTML = svg;
          this.onSVGInserted.emit(null);
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
