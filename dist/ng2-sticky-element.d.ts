import { ElementRef, OnDestroy, OnInit, Renderer } from '@angular/core';
export declare class StickyElement implements OnInit, OnDestroy {
    private _el;
    private _renderer;
    sticky: string;
    private _relativeEl;
    private _relativeElPos;
    private _raf;
    constructor(_el: ElementRef, _renderer: Renderer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private _getPos();
}
