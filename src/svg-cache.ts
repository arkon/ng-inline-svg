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
    // TODO: resolve full absolute URL path first?

    // Return cached copy if it exists
    if (cache && SVGCache._cache.has(url)) {
      return Observable.of(SVGCache._cache.get(url));
    }

    // Otherwise, make the HTTP call to fetch
    return this._http.get(url)
      .map(res => res.text())
      .catch((err: any, caught: Observable<string>): Observable<SVGElement> => {
        console.error(`Loading SVG icon from URL ${url} failed`, err);

        return Observable.of(null);
      })
      .do(svg => {
        if (svg) {
          const svgElement = this._svgElementFromString(svg as any as string);

          // Cache SVG element
          if (cache) {
            SVGCache._cache.set(url, svgElement);
          }

          return Observable.of(svgElement);
        }
      });
  }

  private _svgElementFromString(str: string): SVGElement {
    const div = document.createElement('DIV');
    div.innerHTML = str;

    const svg = div.querySelector('svg') as SVGElement;

    if (!svg) {
      throw new Error('No SVG found in loaded contents');
    }

    return svg;
  }
}
