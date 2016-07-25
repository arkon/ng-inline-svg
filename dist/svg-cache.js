"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var SVGCache = (function () {
    function SVGCache(_http) {
        this._http = _http;
        if (!SVGCache._cache) {
            SVGCache._cache = new Map();
        }
    }
    SVGCache.prototype.getSVG = function (url, cache) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var absUrl = _this._getAbsoluteUrl(url);
            if (cache && SVGCache._cache.has(absUrl)) {
                resolve(_this._cloneSvg(SVGCache._cache.get(absUrl)));
            }
            _this._http.get(absUrl)
                .map(function (res) { return res.text(); })
                .subscribe(function (svg) {
                if (svg) {
                    var svgElement = _this._svgElementFromString(svg);
                    if (cache) {
                        SVGCache._cache.set(absUrl, svgElement);
                    }
                    resolve(svgElement);
                }
            }, function (err) { return reject(err); });
        });
    };
    SVGCache.prototype._getAbsoluteUrl = function (url) {
        var base = document.createElement('BASE');
        base.href = url;
        return base.href;
    };
    SVGCache.prototype._svgElementFromString = function (str) {
        var div = document.createElement('DIV');
        div.innerHTML = str;
        var svg = div.querySelector('svg');
        if (!svg) {
            throw new Error('No SVG found in loaded contents');
        }
        return svg;
    };
    SVGCache.prototype._cloneSvg = function (svg) {
        return svg.cloneNode(true);
    };
    SVGCache = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SVGCache);
    return SVGCache;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SVGCache;
