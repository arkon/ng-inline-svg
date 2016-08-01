import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
export default class SVGCache {
    private _http;
    private static _cache;
    private static _inProgressFetches;
    constructor(_http: Http);
    getSVG(url: string, cache: boolean): Observable<SVGElement>;
    private _svgElementFromString(str);
    private _cloneSvg(svg);
}
