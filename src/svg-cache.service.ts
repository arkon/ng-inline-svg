import { Injectable, Optional, Renderer2 } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

export class InlineSVGConfig {
  baseUrl: string;
}

@Injectable()
export class SVGCacheService {
  /** @internal */
  private static _cache: Map<string, SVGElement>;

  /** @internal */
  private static _inProgressReqs: Map<string, Observable<SVGElement>>;

  /** @internal */
  private _baseUrl: string;

  constructor(
    @Optional() config: InlineSVGConfig,
    private _renderer: Renderer2,
    private _http: Http) {
    if (config) {
      this._baseUrl = config.baseUrl;
    }

    if (!SVGCacheService._cache) {
      SVGCacheService._cache = new Map<string, SVGElement>();
    }

    if (!SVGCacheService._inProgressReqs) {
      SVGCacheService._inProgressReqs = new Map<string, Observable<SVGElement>>();
    }
  }

  getSVG(url: string, cache: boolean = true): Observable<SVGElement> {
    const absUrl = this._getAbsoluteUrl(url);

    // Return cached copy if it exists
    if (cache && SVGCacheService._cache.has(absUrl)) {
      return Observable.of(this._cloneSVG(SVGCacheService._cache.get(absUrl)));
    }

    // Return existing fetch observable
    if (SVGCacheService._inProgressReqs.has(absUrl)) {
      return SVGCacheService._inProgressReqs.get(absUrl);
    }

    // Otherwise, make the HTTP call to fetch
    const req = this._http.get(absUrl)
      .map((res: Response) => res.text())
      .catch((err: any) => err)
      .finally(() => {
        SVGCacheService._inProgressReqs.delete(absUrl);
      })
      .share()
      .map((svgText: string) => {
        const svgEl = this._svgElementFromString(svgText);
        SVGCacheService._cache.set(absUrl, svgEl);
        return this._cloneSVG(svgEl);
      });

    SVGCacheService._inProgressReqs.set(absUrl, req);

    return req;
  }

  /** @internal */
  private _getAbsoluteUrl(url: string): string {
    // Prepend user-configured base if present
    if (this._baseUrl) {
      url = this._baseUrl + url;
    }

    const base = this._renderer.createElement('BASE') as HTMLBaseElement;
    base.href = url;

    return base.href;
  }

  /** @internal */
  private _svgElementFromString(str: string): SVGElement | never {
    const div: HTMLElement = this._renderer.createElement('DIV');
    div.innerHTML = str;

    const svg = div.querySelector('svg') as SVGElement;

    if (!svg) {
      throw new Error('No SVG found in loaded contents');
    }

    return svg;
  }

  /** @internal */
  private _cloneSVG(svg: SVGElement): SVGElement {
    return svg.cloneNode(true) as SVGElement;
  }
}
