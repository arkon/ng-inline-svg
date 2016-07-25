import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export default class SVGCache {
  private static _cache: Map<string, SVGElement>;

  constructor(private _http: Http) {
    if (!SVGCache._cache) {
      SVGCache._cache = new Map<string, SVGElement>();
    }
  }

  getSVG(url: string, cache: boolean): Promise<SVGElement> {
    return new Promise((resolve, reject) => {
      // Get full absolute URL path first
      const absUrl = this._getAbsoluteUrl(url);

      // Return cached copy if it exists
      if (cache && SVGCache._cache.has(absUrl)) {
        resolve(this._cloneSvg(SVGCache._cache.get(absUrl)));
      }

      // Otherwise, make the HTTP call to fetch
      this._http.get(absUrl)
        .map(res => res.text())
        .subscribe(
          (svg: string) => {
            if (svg) {
              const svgElement = this._svgElementFromString(svg);

              // Cache SVG element
              if (cache) {
                SVGCache._cache.set(absUrl, svgElement);
              }

              resolve(svgElement);
            }
          },
          (err) => reject(err)
        );
    });
  }

  private _getAbsoluteUrl(url: string) {
    const base = document.createElement('BASE') as HTMLBaseElement;
    base.href = url;

    return base.href;
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
