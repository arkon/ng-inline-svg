import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { InlineSVGDirective } from './inline-svg.directive';
import { InlineSVGService } from './inline-svg.service';

@Component({
  selector: 'inline-svg',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineSVGComponent implements AfterViewInit, OnChanges {
  @Input() context: InlineSVGDirective;
  @Input() content: Element;
  @Input() replaceContents: boolean;
  @Input() prepend: boolean;

  /** @internal */
  _el: ElementRef;

  constructor(private _inlineSVGService: InlineSVGService, el: ElementRef) {
    this._el = el;
  }

  ngAfterViewInit(): void {
    this._updateContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      this._updateContent();
    }
  }

  private _updateContent(): void {
    this._inlineSVGService.insertEl(
      this.context,
      this._el.nativeElement,
      this.content,
      this.replaceContents,
      this.prepend
    );
  }
}
