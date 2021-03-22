import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subscription } from 'rxjs';

import { InlineSVGComponent } from './inline-svg.component';
import { SVGCacheService } from './svg-cache.service';
import { InlineSVGService } from './inline-svg.service';
import { SVGScriptEvalMode, InlineSVGConfig } from './inline-svg.config';
import * as SvgUtil from './svg-util';

@Directive({
  selector: '[inlineSVG]',
  providers: [SVGCacheService]
})
export class InlineSVGDirective implements OnInit, OnChanges, OnDestroy {
  @Input() inlineSVG: string;
  @Input() resolveSVGUrl: boolean = true;
  @Input() replaceContents: boolean = true;
  @Input() prepend: boolean = false;
  @Input() injectComponent: boolean = false;
  @Input() cacheSVG: boolean = true;
  @Input() setSVGAttributes: { [key: string]: any };
  @Input() removeSVGAttributes: Array<string>;
  @Input() forceEvalStyles: boolean = false;
  @Input() evalScripts: SVGScriptEvalMode = SVGScriptEvalMode.ALWAYS;
  @Input() fallbackImgUrl: string;
  @Input() fallbackSVG: string;
  @Input() onSVGLoaded: (svg: SVGElement, parent: Element | null) => SVGElement;

  @Output() onSVGInserted: EventEmitter<SVGElement> = new EventEmitter<SVGElement>();
  @Output() onSVGFailed: EventEmitter<any> = new EventEmitter<any>();

  /** @internal */
  _prevSVG: SVGElement;

  private _supportsSVG: boolean;
  private _prevUrl: string;
  private _svgComp: ComponentRef<InlineSVGComponent>;

  private _subscription: Subscription;

  constructor(
    private _el: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _resolver: ComponentFactoryResolver,
    private _svgCache: SVGCacheService,
    private _renderer: Renderer2,
    private _inlineSVGService: InlineSVGService,
    @Optional() private _config: InlineSVGConfig,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this._supportsSVG = SvgUtil.isSvgSupported();

    // Check if the browser supports embed SVGs
    if (!isPlatformServer(this.platformId) && !this._supportsSVG) {
      this._fail('Embed SVG are not supported by this browser');
    }
  }

  ngOnInit(): void {
    if (!this._isValidPlatform() || this._isSSRDisabled()) { return; }

    this._insertSVG();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this._isValidPlatform() || this._isSSRDisabled()) { return; }

    const setSVGAttributesChanged = Boolean(changes['setSVGAttributes']);
    if (changes['inlineSVG'] || setSVGAttributesChanged) {
      this._insertSVG(setSVGAttributesChanged);
    }
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private _insertSVG(force = false): void {
    if (!isPlatformServer(this.platformId) && !this._supportsSVG) { return; }

    // Check if a URL was actually passed into the directive
    if (!this.inlineSVG) {
      this._fail('No URL passed to [inlineSVG]');
      return;
    }

    // Short circuit if SVG URL hasn't changed
    if (!force && this.inlineSVG === this._prevUrl) {
      return;
    }
    this._prevUrl = this.inlineSVG;

    this._subscription = this._svgCache.getSVG(this.inlineSVG, this.resolveSVGUrl, this.cacheSVG)
      .subscribe(
        (svg: SVGElement) => {
          if (SvgUtil.isUrlSymbol(this.inlineSVG)) {
            const symbolId = this.inlineSVG.split('#')[1];
            svg = SvgUtil.createSymbolSvg(this._renderer, svg, symbolId);
          }

          this._processSvg(svg);
        },
        (err: any) => {
          this._fail(err);
        }
      );
  }

  /**
   * The actual processing (manipulation, lifecycle, etc.) and displaying of the
   * SVG.
   *
   * @param svg The SVG to display within the directive element.
   */
  private _processSvg(svg: SVGElement) {
    if (!svg) { return; }

    if (this.removeSVGAttributes && isPlatformBrowser(this.platformId)) {
      SvgUtil.removeAttributes(svg, this.removeSVGAttributes);
    }

    if (this.setSVGAttributes) {
      SvgUtil.setAttributes(svg, this.setSVGAttributes);
    }

    if (this.onSVGLoaded) {
      svg = this.onSVGLoaded(svg, this._el.nativeElement);
    }

    this._insertEl(svg);

    if (isPlatformBrowser(this.platformId)) {
      this._inlineSVGService.evalScripts(svg, this.inlineSVG, this.evalScripts);
    }

    // Force evaluation of <style> tags since IE doesn't do it.
    // See https://github.com/arkon/ng-inline-svg/issues/17
    if (this.forceEvalStyles) {
      const styleTags = svg.querySelectorAll('style');
      Array.from(styleTags).forEach(tag => tag.textContent += '');
    }

    this.onSVGInserted.emit(svg);
  }

  /**
   * Handles the insertion of the directive contents, which could be an SVG
   * element or a component.
   *
   * @param el The element to put within the directive.
   */
  private _insertEl(el: HTMLElement | SVGElement): void {
    if (this.injectComponent) {
      if (!this._svgComp) {
        const factory = this._resolver.resolveComponentFactory(InlineSVGComponent);
        this._svgComp = this._viewContainerRef.createComponent(factory);
      }

      this._svgComp.instance.context = this;
      this._svgComp.instance.replaceContents = this.replaceContents;
      this._svgComp.instance.prepend = this.prepend;
      this._svgComp.instance.content = el;

      // Force element to be inside the directive element inside of adjacent
      this._renderer.appendChild(
        this._el.nativeElement,
        this._svgComp.injector.get(InlineSVGComponent)._el.nativeElement
      );
    } else {
      this._inlineSVGService.insertEl(this, this._el.nativeElement, el, this.replaceContents, this.prepend);
    }
  }

  private _fail(msg: string): void {
    this.onSVGFailed.emit(msg);

    // Insert fallback image, if specified
    if (this.fallbackImgUrl) {
      const elImg = this._renderer.createElement('IMG');
      this._renderer.setAttribute(elImg, 'src', this.fallbackImgUrl);

      this._insertEl(elImg);
    } else if (this.fallbackSVG && this.fallbackSVG !== this.inlineSVG) {
      this.inlineSVG = this.fallbackSVG;
      this._insertSVG();
    }
  }

  private _isValidPlatform(): boolean {
    return isPlatformServer(this.platformId) || isPlatformBrowser(this.platformId);
  }

  private _isSSRDisabled(): boolean {
    return isPlatformServer(this.platformId) && this._config && this._config.clientOnly;
  }

}
