import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Http } from '@angular/http';

@Injectable()
export default class SVGCache {
  private static _http: Http;
  private static _cache: Map<string, any>;

  constructor(_http: Http) {
    if (!SVGCache._cache) {
      SVGCache._cache = new Map<string, any>();
    }

    if (!SVGCache._http) {
      SVGCache._http = _http;
    }
  }

  static getSVG(url: string): Observable<any> {
    // TODO: make this an observable?

    // Return cached copy if it exists
    if (this._cache.has(url)) {
      return this._cache.get(url);
    }

    // Otherwise, make the HTTP call to fetch
    this._http.get(url)
      .subscribe(
        (data) => {
          this._cache.set(url, data);

          return data;
        },
        (err) => console.error(err)
      );
  }
}
