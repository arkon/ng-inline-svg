import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
export default class SVGCache {
    private _http;
    private static _cache;
    constructor(_http: Http);
    getSVG(url: string, cache: boolean): Promise<SVGElement>;
    private _getAbsoluteUrl(url);
    private _svgElementFromString(str);
    private _cloneSvg(svg);
}
