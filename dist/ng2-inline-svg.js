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
var svg_cache_1 = require('./svg-cache');
var InlineSVG = (function () {
    function InlineSVG(_el, _svgCache) {
        this._el = _el;
        this._svgCache = _svgCache;
        this.cacheSVG = true;
        this.onSVGInserted = new core_1.EventEmitter();
    }
    InlineSVG.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.inlineSVG) {
            console.error('No URL passed to [inlineSVG]!');
            return;
        }
        this._svgCache.getSVG(this.inlineSVG, this.cacheSVG)
            .subscribe(function (svg) {
            if (svg) {
                _this._el.nativeElement.innerHTML = svg;
                _this.onSVGInserted.emit(svg);
            }
        }, function (err) {
            console.error(err);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InlineSVG.prototype, "inlineSVG", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], InlineSVG.prototype, "cacheSVG", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InlineSVG.prototype, "onSVGInserted", void 0);
    InlineSVG = __decorate([
        core_1.Directive({
            selector: '[inlineSVG]',
            providers: [svg_cache_1.default]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, svg_cache_1.default])
    ], InlineSVG);
    return InlineSVG;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InlineSVG;
