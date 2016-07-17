import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import SVGCache from './svg-cache';

@Directive({ selector: '[inline-svg]' })
export default class InlineSVG implements OnInit {
  @Input('inline-svg') url: string;

  @Output() onSVGInserted: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _el: ElementRef) {
  }

  ngOnInit() {
    SVGCache.getSVG(this.url)
      .subscribe(
        (svg) => {
          this._insertSVG(svg);
          this.onSVGInserted.emit(null);
        }
      );
  }

  private _insertSVG(data) {
    this._el.nativeElement.innerHTML = data;
  }
}
