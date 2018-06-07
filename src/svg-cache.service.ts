import { Inject, Injectable, Optional, Renderer2, RendererFactory2 } from '@angular/core';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, finalize, share } from 'rxjs/operators';

import { InlineSVGConfig } from './inline-svg.config';

@Injectable()
export class SVGCacheService {
  private _cache: Map<string, SVGElement>;
  private _inProgressReqs: Map<string, Observable<SVGElement>>;

  private _baseUrl: string;

  private _renderer: Renderer2;

  constructor(
    @Optional() @Inject(APP_BASE_HREF) private _appBase: string,
    @Optional() private _location: PlatformLocation,
    @Optional() private _config: InlineSVGConfig,
    private _http: HttpClient,
    rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);

    this.setBaseUrl();

    this._cache = new Map<string, SVGElement>();
    this._inProgressReqs = new Map<string, Observable<SVGElement>>();
  }

  getSVG(url: string, cache: boolean = true): Observable<SVGElement> {
    const absUrl = this.getAbsoluteUrl(url);

    // Return cached copy if it exists
    if (cache && this._cache.has(absUrl)) {
      return of(this._cloneSVG(this._cache.get(absUrl)));
    }

    // Return existing fetch observable
    if (this._inProgressReqs.has(absUrl)) {
      return this._inProgressReqs.get(absUrl);
    }

    // Otherwise, make the HTTP call to fetch
    const req = this._http.get(absUrl, { responseType: 'text' })
      .pipe(
        finalize(() => {
          this._inProgressReqs.delete(absUrl);
        }),
        share(),
        map((svgText: string) => {
          const svgEl = this._svgElementFromString(svgText);
          this._cache.set(absUrl, svgEl);
          return this._cloneSVG(svgEl);
        })
      );

    this._inProgressReqs.set(absUrl, req);

    return req;
  }

  setBaseUrl(): void {
    if (this._config) {
      this._baseUrl = this._config.baseUrl;
    } else if (this._appBase !== null) {
      this._baseUrl = this._appBase;
    } else if (this._location !== null) {
      this._baseUrl = this._location.getBaseHrefFromDOM();
    }
  }

  getAbsoluteUrl(url: string): string {
    // Prepend user-configured base if present and URL doesn't seem to have its own
    if (this._baseUrl && !/^https?:\/\//i.test(url)) {
      url = this._baseUrl + url;

      // Convert leading "//" to "/" to prevent a malformed URL
      // See https://github.com/arkon/ng-inline-svg/issues/50
      if (url.indexOf('//') === 0) {
        url = url.substring(1);
      }
    }

    const base = this._renderer.createElement('BASE');
    base.href = url;

    return base.href;
  }

  private _svgElementFromString(str: string): SVGElement | never {
    const div = this._renderer.createElement('DIV');
    div.innerHTML = str;

    const svg = div.querySelector('svg') as SVGElement;

    if (!svg) {
      throw new Error('No SVG found in loaded contents');
    }

    return svg;
  }

  private _cloneSVG(svg: SVGElement): SVGElement {
    return svg.cloneNode(true) as SVGElement;
  }

}
