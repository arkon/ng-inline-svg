import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SVGCacheService } from './svg-cache.service';

@Directive({
  selector: '[inlineSVG]',
  providers: [SVGCacheService]
})
export class InlineSVGDirective implements OnInit, OnChanges, OnDestroy {
  @Input() inlineSVG: string;
  @Input() replaceContents: boolean = true;
  @Input() prepend: boolean = false;
  @Input() cacheSVG: boolean = true;
  @Input() removeSVGAttributes: Array<string>;
  @Input() forceEvalStyles: boolean = false;
  @Input() evalScripts: 'always' | 'once' | 'never' = 'always';
  @Input() fallbackImgUrl: string;

  @Output() onSVGInserted: EventEmitter<SVGElement> = new EventEmitter<SVGElement>();
  @Output() onSVGFailed: EventEmitter<any> = new EventEmitter<any>();

  /** @internal */
  private _prevUrl: string;

  /** @internal */
  private _supportsSVG: boolean = true;

  /** @internal */
  private _ranScripts: { [url: string]: boolean } = {};

  /** @internal */
  private _subscription: Subscription;

  /** @internal */
  private _prevSVG: SVGElement;

  constructor(
    private _el: ElementRef,
    private _svgCache: SVGCacheService) {
  }

  ngOnInit(): void {
    if (!this._isBrowser()) { return; }

    this._insertSVG();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this._isBrowser()) { return; }

    if (changes['inlineSVG']) {
      this._insertSVG();
    }
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  /** @internal */
  private _insertSVG(): void {
    if (!this._supportsSVG) {
      return;
    }

    // Check if the browser supports embed SVGs
    if (!this._checkSVGSupport()) {
      this._fail('Embed SVG not supported by browser');
      this._supportsSVG = false;
      return;
    }

    // Check if a URL was actually passed into the directive
    if (!this.inlineSVG) {
      this._fail('No URL passed to [inlineSVG]');
      return;
    }

    // Support for symbol IDs
    if (this.inlineSVG.charAt(0) === '#' || this.inlineSVG.indexOf('.svg#') > -1) {
      const elSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const elSvgUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      elSvgUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.inlineSVG);
      elSvg.appendChild(elSvgUse);

      this._insertEl(elSvg);

      this.onSVGInserted.emit(elSvg);
      return;
    }

    if (this.inlineSVG !== this._prevUrl) {
      this._prevUrl = this.inlineSVG;

      // Fetch SVG via cache mechanism
      this._subscription = this._svgCache.getSVG(this.inlineSVG, this.cacheSVG)
        .subscribe(
          (svg: SVGElement) => {
            // Insert SVG
            if (svg && this._el.nativeElement) {
              if (this.removeSVGAttributes) {
                this._removeAttributes(svg, this.removeSVGAttributes);
              }

              this._insertEl(svg);

              // Script evaluation
              this._evalScripts(svg, this.inlineSVG);

              // Force evaluation of <style> tags since IE doesn't do it.
              // Reference: https://github.com/arkon/ng-inline-svg/issues/17
              if (this.forceEvalStyles) {
                const styleTags = svg.querySelectorAll('style');
                Array.prototype.forEach.call(styleTags, tag => tag.textContent += '');
              }

              this.onSVGInserted.emit(svg);
            }
          },
          (err: any) => {
            this._fail(err);
          }
        );
    }
  }

  /** @internal */
  private _insertEl(el: Element) {
    if (this.replaceContents && !this.prepend) {
      if (this._prevSVG) {
        this._prevSVG.parentNode.removeChild(this._prevSVG);
      }

      this._el.nativeElement.innerHTML = '';
    }

    if (this.prepend) {
      this._el.nativeElement.insertBefore(el, this._el.nativeElement.firstChild);
    } else {
      this._el.nativeElement.appendChild(el);
    }

    if (el.nodeName === 'svg') {
      this._prevSVG = el as SVGElement;
    }
  }

  /** @internal */
  private _removeAttributes(svg: SVGElement, attrs: Array<string>) {
    const innerEls = svg.getElementsByTagName('*');

    for (let i = 0; i < innerEls.length; i++) {
      const elAttrs = innerEls[i].attributes;

      for (let j = 0; j < elAttrs.length; j++) {
        if (attrs.indexOf(elAttrs[j].name.toLowerCase()) > -1) {
          innerEls[i].removeAttribute(elAttrs[j].name);
        }
      }
    }
  }

  // Based off code from https://github.com/iconic/SVGInjector
  /** @internal */
  private _evalScripts(svg: SVGElement, url: string) {
    const scripts = svg.querySelectorAll('script');
    const scriptsToEval = [];
    let script, scriptType;

    // Fetch scripts from SVG
    for (let i = 0; i < scripts.length; i++) {
      scriptType = scripts[i].getAttribute('type');

      if (!scriptType || scriptType === 'application/ecmascript' || scriptType === 'application/javascript') {
        script = scripts[i].innerText || scripts[i].textContent;
        scriptsToEval.push(script);
        svg.removeChild(scripts[i]);
      }
    }

    // Run scripts in closure as needed
    if (scriptsToEval.length > 0 && (this.evalScripts === 'always' ||
        (this.evalScripts === 'once' && !this._ranScripts[url]))) {
      for (let i = 0; i < scriptsToEval.length; i++) {
        new Function(scriptsToEval[i])(window);
      }

      this._ranScripts[url] = true;
    }
  }

  /** @internal */
  private _fail(msg: string) {
    this.onSVGFailed.emit(msg);

    // Insert fallback image, if specified
    if (this.fallbackImgUrl) {
      const elImg = document.createElement('IMG') as HTMLImageElement;
      elImg.src = this.fallbackImgUrl;

      this._insertEl(elImg);
    }
  }

  /** @internal */
  private _isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  /** @internal */
  private _checkSVGSupport() {
    return typeof SVGRect !== 'undefined';
  }
}
