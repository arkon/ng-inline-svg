import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
export default class SVGCache {
    private _http;
    private static _cache;
    constructor(_http: Http);
    getSVG(url: string): Observable<SVGElement>;
    private _svgElementFromString(str);
}
