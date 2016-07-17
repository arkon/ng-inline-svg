import { Http } from '@angular/http';

export default class SVGCache {
  private _instance: SVGCache;
  private _cache: Map<string, any>;

  constructor() {
    this._cache = new Map();
  }

  get INSTANCE() {
    if (!this._instance) {
      this._instance = new SVGCache();
    }

    return this._instance;
  }

  getSVG(url: string, svg: any) {
    // Observable/promise?

    // Return cached copy if it exists
    if (this._cache.has(url)) {
      return this._cache.get(url);
    }

    // Otherwise, make the HTTP call to fetch
    return this._http.get(url)
      .map(res => res.json())
      .subscribe(
        (data) => {
          this._cache.add(url, data);

          return data;
        },
        (err) => console.error(err)
      );

  }
}
