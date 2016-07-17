import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer
} from '@angular/core';
import SVGCache from './svg-cache';

@Directive({ selector: '[inline-svg]' })
export default class InlineSVG implements OnInit, OnDestroy {
  @Input('inline-svg') url: string;

  constructor(private _http: Http, private _el: ElementRef, private _renderer: Renderer) {
  }

  ngOnInit() {
    const svg = SVGCache.instance.getSVG(this.url);

    // When observable/promise resolves:
    this._insertSVG(svg);
  }

  ngOnDestroy() {
  }

  _insertSVG(data) {
    this._el.nativeElement.innerHTML = data;
  }
}
