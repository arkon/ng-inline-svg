"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var svg_cache_service_1 = require('./svg-cache.service');
var InlineSVGDirective = (function () {
    function InlineSVGDirective(_document, _el, _svgCache) {
        this._document = _document;
        this._el = _el;
        this._svgCache = _svgCache;
        this.replaceContents = true;
        this.cacheSVG = true;
        this.onSVGInserted = new core_1.EventEmitter();
    }
    InlineSVGDirective.prototype.ngOnInit = function () {
        this._insertSVG();
    };
    InlineSVGDirective.prototype.ngOnChanges = function (changes) {
        if (changes['inlineSVG']) {
            this._insertSVG();
        }
    };
    InlineSVGDirective.prototype._insertSVG = function () {
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
                    if (_this.removeSVGAttributes) {
                        _this._removeAttributes(svg, _this.removeSVGAttributes);
                    }
                    _this._el.nativeElement.appendChild(svg);
                    _this.onSVGInserted.emit(svg);
                }
            }, function (err) {
                console.error(err);
            });
        }
    };
    InlineSVGDirective.prototype._getAbsoluteUrl = function (url) {
        var base = this._document.createElement('BASE');
        base.href = url;
        return base.href;
    };
    InlineSVGDirective.prototype._removeAttributes = function (svg, attrs) {
        var innerEls = svg.getElementsByTagName('*');
        for (var i = 0; i < innerEls.length; i++) {
            var elAttrs = innerEls[i].attributes;
            for (var j = 0; j < elAttrs.length; j++) {
                if (attrs.indexOf(elAttrs[j].name.toLowerCase()) > -1) {
                    innerEls[i].removeAttribute(elAttrs[j].name);
                }
            }
        }
    };
    InlineSVGDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[inlineSVG]',
                    providers: [svg_cache_service_1.SVGCache]
                },] },
    ];
    InlineSVGDirective.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [platform_browser_1.DOCUMENT,] },] },
        { type: core_1.ElementRef, },
        { type: svg_cache_service_1.SVGCache, },
    ];
    InlineSVGDirective.propDecorators = {
        'inlineSVG': [{ type: core_1.Input },],
        'replaceContents': [{ type: core_1.Input },],
        'cacheSVG': [{ type: core_1.Input },],
        'removeSVGAttributes': [{ type: core_1.Input },],
        'onSVGInserted': [{ type: core_1.Output },],
    };
    return InlineSVGDirective;
}());
exports.InlineSVGDirective = InlineSVGDirective;
