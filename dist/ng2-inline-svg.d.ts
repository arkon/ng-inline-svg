import { ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import SVGCache from './svg-cache';
export default class InlineSVG implements OnInit, OnChanges {
    private _el;
    private _svgCache;
    replaceContents: boolean;
    cacheSVG: boolean;
    onSVGInserted: EventEmitter<SVGElement>;
    private inlineSVG;
    private _absUrl;
    constructor(_el: ElementRef, _svgCache: SVGCache);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private _insertSVG();
    private _getAbsoluteUrl(url);
}
