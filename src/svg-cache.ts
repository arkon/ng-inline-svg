import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export default class SVGCache {
  private static _cache: Map<string, SVGElement>;

  constructor(private _http: Http) {
    if (!SVGCache._cache) {
      SVGCache._cache = new Map<string, SVGElement>();
    }
  }

  getSVG(url: string, cache: boolean): Observable<SVGElement> {
    // Get full absolute URL path first
    const absUrl = this._getAbsoluteUrl(url);

    // Return cached copy if it exists
    if (cache && SVGCache._cache.has(absUrl)) {
      return Observable.of(SVGCache._cache.get(absUrl));
    }

    // Otherwise, make the HTTP call to fetch
    return this._http.get(absUrl)
      .map(res => res.text())
      .catch((err: any, caught: Observable<string>): Observable<SVGElement> => {
        console.error(`Loading SVG icon from URL ${absUrl} failed`, err);

        return Observable.of(null);
      })
      .do(svg => {
        if (svg) {
          const svgElement = this._svgElementFromString(svg as any as string);

          // Cache SVG element
          if (cache) {
            SVGCache._cache.set(absUrl, svgElement);
          }

          return Observable.of(svgElement);
        }
      });
  }

  private _svgElementFromString(str: string): SVGElement {
    const div = document.createElement('DIV') as HTMLElement;
    div.innerHTML = str;

    const svg = div.querySelector('svg') as SVGElement;

    if (!svg) {
      throw new Error('No SVG found in loaded contents');
    }

    return svg;
  }

  private _getAbsoluteUrl(url: string) {
    const base = document.createElement('BASE') as HTMLBaseElement;
    base.href = url;

    return base.href
  }
}
