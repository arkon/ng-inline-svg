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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var platform_browser_1 = require('@angular/platform-browser');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/of');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/finally');
require('rxjs/add/operator/map');
require('rxjs/add/operator/share');
var SVGCache = (function () {
    function SVGCache(_document, _http) {
        this._document = _document;
        this._http = _http;
        if (!SVGCache._cache) {
            SVGCache._cache = new Map();
        }
        if (!SVGCache._inProgressReqs) {
            SVGCache._inProgressReqs = new Map();
        }
    }
    SVGCache.prototype.getSVG = function (url, cache) {
        var _this = this;
        if (cache === void 0) { cache = true; }
        if (cache && SVGCache._cache.has(url)) {
            return Observable_1.Observable.of(this._cloneSVG(SVGCache._cache.get(url)));
        }
        if (SVGCache._inProgressReqs.has(url)) {
            return SVGCache._inProgressReqs.get(url);
        }
        var req = this._http.get(url)
            .map(function (res) { return res.text(); })
            .catch(function (err) { return err; })
            .finally(function () {
            SVGCache._inProgressReqs.delete(url);
        })
            .share()
            .map(function (svgText) {
            var svgEl = _this._svgElementFromString(svgText);
            SVGCache._cache.set(url, svgEl);
            return _this._cloneSVG(svgEl);
        });
        SVGCache._inProgressReqs.set(url, req);
        return req;
    };
    SVGCache.prototype._svgElementFromString = function (str) {
        var div = this._document.createElement('DIV');
        div.innerHTML = str;
        var svg = div.querySelector('svg');
        if (!svg) {
            throw new Error('No SVG found in loaded contents');
        }
        return svg;
    };
    SVGCache.prototype._cloneSVG = function (svg) {
        return svg.cloneNode(true);
    };
    SVGCache = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [HTMLDocument, http_1.Http])
    ], SVGCache);
    return SVGCache;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SVGCache;
