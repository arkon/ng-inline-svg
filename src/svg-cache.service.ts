import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, map, share } from 'rxjs/operators';
import { InlineSVGConfig } from './inline-svg.config';


@Injectable({
  providedIn: 'root'
})
export class SVGCacheService {
  private static _cache: Map<string, SVGElement>;
  private static _inProgressReqs: Map<string, Observable<SVGElement>>;

  private _baseUrl: string;

  private _http: HttpClient;

  private _renderer: Renderer2;

  constructor(
    @Optional() @Inject(APP_BASE_HREF) private _appBase: string,
    @Optional() private _location: PlatformLocation,
    @Optional() private _config: InlineSVGConfig,
    private httpBackend: HttpBackend,
    rendererFactory: RendererFactory2) {
    this._http = new HttpClient(this.httpBackend);
    this._renderer = rendererFactory.createRenderer(null, null);

    this.setBaseUrl();

    if (!SVGCacheService._cache) {
      SVGCacheService._cache = new Map<string, SVGElement>();
    }
    if (!SVGCacheService._inProgressReqs) {
      SVGCacheService._inProgressReqs = new Map<string, Observable<SVGElement>>();
    }
  }

  getSVG(url: string, cache: boolean = true): Observable<SVGElement> {
    const absUrl = this.getAbsoluteUrl(url);

    // Return cached copy if it exists
    if (cache && SVGCacheService._cache.has(absUrl)) {
      return of(this._cloneSVG(SVGCacheService._cache.get(absUrl)));
    }

    // Return existing fetch observable
    if (SVGCacheService._inProgressReqs.has(absUrl)) {
      return SVGCacheService._inProgressReqs.get(absUrl);
    }

    // Otherwise, make the HTTP call to fetch
    const req = this._http.get(absUrl, { responseType: 'text' })
      .pipe(
        finalize(() => {
          SVGCacheService._inProgressReqs.delete(absUrl);
        }),
        share(),
        map((svgText: string) => {
          const svgEl = this._svgElementFromString(svgText);
          SVGCacheService._cache.set(absUrl, svgEl);
          return this._cloneSVG(svgEl);
        })
      );

    SVGCacheService._inProgressReqs.set(absUrl, req);

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
