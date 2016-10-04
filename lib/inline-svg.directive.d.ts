import { ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SVGCache } from './svg-cache.service';
export declare class InlineSVGDirective implements OnInit, OnChanges {
    private _document;
    private _el;
    private _svgCache;
    inlineSVG: string;
    replaceContents: boolean;
    cacheSVG: boolean;
    removeSVGAttributes: Array<string>;
    onSVGInserted: EventEmitter<SVGElement>;
    private _absUrl;
    constructor(_document: any, _el: ElementRef, _svgCache: SVGCache);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private _insertSVG();
    private _getAbsoluteUrl(url);
    private _removeAttributes(svg, attrs);
}
