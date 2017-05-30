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
import { insertEl } from './utils';

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

  constructor(private _el: ElementRef) {
  }

  ngAfterViewInit(): void {
    this._updateContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      this._updateContent();
    }
  }

  private _updateContent() {
    insertEl(this.context, this._el.nativeElement, this.content, this.replaceContents, this.prepend);
  }
}
