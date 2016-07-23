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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/of');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/do');
require('rxjs/add/operator/map');
var SVGCache = (function () {
    function SVGCache(_http) {
        this._http = _http;
        if (!SVGCache._cache) {
            SVGCache._cache = new Map();
        }
    }
    SVGCache.prototype.getSVG = function (url) {
        var _this = this;
        if (SVGCache._cache.has(url)) {
            return Observable_1.Observable.of(SVGCache._cache.get(url));
        }
        return this._http.get(url)
            .map(function (res) { return res.text(); })
            .catch(function (err, caught) {
            console.error("Loading SVG icon from URL " + url + " failed", err);
            return Observable_1.Observable.of(null);
        })
            .do(function (svg) {
            if (svg) {
                var svgElement = _this._svgElementFromString(svg);
                SVGCache._cache.set(url, svgElement);
                return Observable_1.Observable.of(svgElement);
            }
        });
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
    SVGCache = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SVGCache);
    return SVGCache;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SVGCache;
