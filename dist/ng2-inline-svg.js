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
var platform_browser_1 = require('@angular/platform-browser');
var svg_cache_1 = require('./svg-cache');
var InlineSVG = (function () {
    function InlineSVG(_document, _el, _svgCache) {
        this._document = _document;
        this._el = _el;
        this._svgCache = _svgCache;
        this.replaceContents = true;
        this.cacheSVG = true;
        this.onSVGInserted = new core_1.EventEmitter();
    }
    InlineSVG.prototype.ngOnInit = function () {
        this._insertSVG();
    };
    InlineSVG.prototype.ngOnChanges = function (changes) {
        if (changes['inlineSVG'] &&
            changes['inlineSVG'].currentValue !== changes['inlineSVG'].previousValue) {
            this._insertSVG();
        }
    };
    InlineSVG.prototype._insertSVG = function () {
        var _this = this;
        if (!this.inlineSVG) {
            console.error('No URL passed to [inlineSVG]!');
            return;
        }
        var absUrl = this._getAbsoluteUrl(this.inlineSVG);
        if (absUrl !== this._absUrl) {
            this._absUrl = absUrl;
            this._svgCache.getSVG(this._absUrl, this.cacheSVG)
                .subscribe(function (svg) {
                if (svg && _this._el.nativeElement) {
                    if (_this.replaceContents) {
                        _this._el.nativeElement.innerHTML = '';
                    }
                    _this._el.nativeElement.appendChild(svg);
                    _this.onSVGInserted.emit(svg);
                }
            }, function (err) {
                console.error(err);
            });
        }
    };
    InlineSVG.prototype._getAbsoluteUrl = function (url) {
        var base = this._document.createElement('BASE');
        base.href = url;
        return base.href;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], InlineSVG.prototype, "replaceContents", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], InlineSVG.prototype, "cacheSVG", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InlineSVG.prototype, "onSVGInserted", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InlineSVG.prototype, "inlineSVG", void 0);
    InlineSVG = __decorate([
        core_1.Directive({
            selector: '[inlineSVG]',
            providers: [svg_cache_1.default]
        }),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [HTMLDocument, core_1.ElementRef, svg_cache_1.default])
    ], InlineSVG);
    return InlineSVG;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InlineSVG;
