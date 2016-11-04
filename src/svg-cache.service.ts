import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class SVGCache {
  /** @internal */
  private static _cache: Map<string, SVGElement>;

  /** @internal */
  private static _inProgressReqs: Map<string, Observable<SVGElement>>;

  constructor(
    @Inject(DOCUMENT) private _document /*: HTMLDocument */,
    private _http: Http) {
    if (!SVGCache._cache) {
      SVGCache._cache = new Map<string, SVGElement>();
    }

    if (!SVGCache._inProgressReqs) {
      SVGCache._inProgressReqs = new Map<string, Observable<SVGElement>>();
    }
  }

  getSVG(url: string, cache: boolean = true): Observable<SVGElement> {
    // Return cached copy if it exists
    if (cache && SVGCache._cache.has(url)) {
      return Observable.of(this._cloneSVG(SVGCache._cache.get(url)));
    }

    // Return existing fetch observable
    if (SVGCache._inProgressReqs.has(url)) {
      return SVGCache._inProgressReqs.get(url);
    }

    // Otherwise, make the HTTP call to fetch
    const req = this._http.get(url)
      .map((res: Response) => res.text())
      .catch((err: any) => err)
      .finally(() => {
        SVGCache._inProgressReqs.delete(url);
      })
      .share()
      .map((svgText: string) => {
        const svgEl = this._svgElementFromString(svgText);
        SVGCache._cache.set(url, svgEl);
        return this._cloneSVG(svgEl);
      });

    SVGCache._inProgressReqs.set(url, req);

    return req;
  }

  /** @internal */
  private _svgElementFromString(str: string): SVGElement | never {
    const div: HTMLElement = this._document.createElement('DIV');
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
