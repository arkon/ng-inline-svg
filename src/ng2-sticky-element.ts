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

@Directive({ selector: '[sticky]' })
export class StickyElement implements OnInit, OnDestroy {
  @Input() sticky: string;

  private _relativeEl: HTMLElement;
  private _relativeElPos: ClientRect;

  private _raf: number;

  constructor(private _el: ElementRef, private _renderer: Renderer) {
  }

  ngOnInit() {
    this._relativeEl = this._el.nativeElement.closest(this.sticky);

    this._raf = window.requestAnimationFrame(() => {
      this._getPos();
    });
  }

  ngOnDestroy() {
    window.cancelAnimationFrame(this._raf);
  }

  private _getPos() {
    this._relativeElPos = this._relativeEl.getBoundingClientRect();

    this._renderer.setElementStyle(this._el.nativeElement, 'top', `${this._relativeElPos.top}px`);
    this._renderer.setElementStyle(this._el.nativeElement, 'left', `${this._relativeElPos.left}px`);
  }
}
