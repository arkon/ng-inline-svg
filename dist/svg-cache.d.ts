import { Observable } from 'rxjs/observable';
import { Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
export default class SVGCache {
    private _http;
    private _cache;
    constructor(_http: Http);
    getSVG(url: string): Observable<SVGElement>;
    private _svgElementFromString(str);
}
