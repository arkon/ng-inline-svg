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
var StickyElement = (function () {
    function StickyElement(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
    }
    StickyElement.prototype.ngOnInit = function () {
        var _this = this;
        this._relativeEl = this._el.nativeElement.closest(this.sticky);
        this._raf = window.requestAnimationFrame(function () {
            _this._getPos();
        });
    };
    StickyElement.prototype.ngOnDestroy = function () {
        window.cancelAnimationFrame(this._raf);
    };
    StickyElement.prototype._getPos = function () {
        this._relativeElPos = this._relativeEl.getBoundingClientRect();
        this._renderer.setElementStyle(this._el.nativeElement, 'top', this._relativeElPos.top + "px");
        this._renderer.setElementStyle(this._el.nativeElement, 'left', this._relativeElPos.left + "px");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StickyElement.prototype, "sticky", void 0);
    StickyElement = __decorate([
        core_1.Directive({ selector: '[sticky]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], StickyElement);
    return StickyElement;
}());
exports.StickyElement = StickyElement;
