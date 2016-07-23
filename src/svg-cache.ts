import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export default class SVGCache {
  private _cache: Map<string, SVGElement>;

  constructor(private _http: Http) {
    this._cache = new Map<string, SVGElement>();
  }

  getSVG(url: string): Observable<SVGElement> {
    // Return cached copy if it exists
    if (this._cache.has(url)) {
      return Observable.of(this._cache.get(url));
    }

    // Otherwise, make the HTTP call to fetch
    return this._http.get(url)
      .map(res => res.text())
      .catch((err: any, caught: Observable<string>): Observable<SVGElement> => {
        console.error(`Loading SVG icon URL: ${url} failed: ${err}`);
        return Observable.of(null);
      })
      .do(svg => {
        // Cache SVG element.
        if (svg) {
          const svgElement = this._svgElementFromString(svg as any as string);

          this._cache.set(url, svgElement);

          return Observable.of(svgElement);
        }
      });
  }

  private _svgElementFromString(str: string): SVGElement {
    const div = document.createElement('DIV');
    div.innerHTML = str;

    const svg = div.querySelector('svg') as SVGElement;

    if (!svg) {
      throw new Error('No SVG found');
    }

    return svg;
  }
}
