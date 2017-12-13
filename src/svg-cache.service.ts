import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { InlineSVGConfig } from './inline-svg.config';

@Injectable()
export class SVGCacheService {
  private static _cache: Map<string, SVGElement>;
  private static _inProgressReqs: Map<string, Observable<SVGElement>>;

  private static _baseUrl: string;

  constructor(
    @Optional() config: InlineSVGConfig,
    private _http: HttpClient) {
    if (config && !SVGCacheService._baseUrl) {
      SVGCacheService._baseUrl = config.baseUrl;
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
    const req = this._http.get(absUrl, {responseType: 'text'})
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

  private _getAbsoluteUrl(url: string): string {
    // Prepend user-configured base if present and URL doesn't seem to have its own
    if (SVGCacheService._baseUrl && !/^https?:\/\//i.test(url)) {
      url = SVGCacheService._baseUrl + url;

      // Convert leading "//" to "/" to prevent a malformed URL
      // See https://github.com/arkon/ng-inline-svg/issues/50
      if (url.indexOf('//') === 0) {
        url = url.substring(1);
      }
    }

    const base = document.createElement('BASE') as HTMLBaseElement;
    base.href = url;

    return base.href;
  }

  private _svgElementFromString(str: string): SVGElement | never {
    const div: HTMLElement = document.createElement('DIV');
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
