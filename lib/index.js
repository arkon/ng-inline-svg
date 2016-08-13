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
var inline_svg_directive_1 = require('./inline-svg.directive');
exports.InlineSVGDirective = inline_svg_directive_1.default;
var svg_cache_service_1 = require('./svg-cache.service');
var InlineSVGModule = (function () {
    function InlineSVGModule() {
    }
    InlineSVGModule = __decorate([
        core_1.NgModule({
            declarations: [inline_svg_directive_1.default],
            imports: [http_1.HttpModule],
            exports: [inline_svg_directive_1.default],
            providers: [svg_cache_service_1.default]
        }), 
        __metadata('design:paramtypes', [])
    ], InlineSVGModule);
    return InlineSVGModule;
}());
exports.InlineSVGModule = InlineSVGModule;
