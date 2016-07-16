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

@Directive({ selector: '[inline-svg]' })
export default class InlineSVG implements OnInit, OnDestroy {
  @Input() sticky: string;

  constructor(private _el: ElementRef, private _renderer: Renderer) {
  }

  ngOnInit() {
    // Read input SVG name, store in cache map, insert into elemen
  }

  ngOnDestroy() {
  }
}
