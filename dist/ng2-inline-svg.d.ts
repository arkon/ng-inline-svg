import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import SVGCache from './svg-cache';
export default class InlineSVG implements OnInit {
    private _el;
    private _svgCache;
    url: string;
    onSVGInserted: EventEmitter<any>;
    constructor(_el: ElementRef, _svgCache: SVGCache);
    ngOnInit(): void;
    private _insertSVG(data);
}
