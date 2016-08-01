import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export default class SVGCache {
  private static _cache: Map<string, SVGElement>;
  private static _inProgressFetches: Map<string, Observable<SVGElement>>;

  constructor(private _http: Http) {
    if (!SVGCache._cache) {
      SVGCache._cache = new Map<string, SVGElement>();
    }

    if (!SVGCache._inProgressFetches) {
      SVGCache._inProgressFetches = new Map<string, Observable<SVGElement>>();
    }
  }

  getSVG(url: string, cache: boolean): Observable<SVGElement> {
    // Return cached copy if it exists
    if (cache && SVGCache._cache.has(url)) {
      return Observable.of(this._cloneSvg(SVGCache._cache.get(url)));
    }

    // Return existing fetch observable
    if (SVGCache._inProgressFetches.has(url)) {
      return SVGCache._inProgressFetches.get(url);
    }

    // Otherwise, make the HTTP call to fetch
    const req = this._http.get(url)
      .map((res: Response) => res.text())
      .finally(() => {
        SVGCache._inProgressFetches.delete(url);
      })
      .share()
      .do((svgText: string) => SVGCache._cache.set(url, this._svgElementFromString(svgText)))
      .map((svg: string) => this._cloneSvg(SVGCache._cache.get(url)));

    SVGCache._inProgressFetches.set(url, req);

    return req;
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

  private _cloneSvg(svg: SVGElement): SVGElement {
    return svg.cloneNode(true) as SVGElement;
  }
}
