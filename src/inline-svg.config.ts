import { Inject, Optional } from '@angular/core';
import { PlatformLocation, APP_BASE_HREF } from '@angular/common';

export class InlineSVGConfig {
  baseUrl: string;
}

export class InlineSVGDefaultConfig extends InlineSVGConfig {
  constructor(
    @Optional() @Inject(APP_BASE_HREF) appBase: string,
    @Optional() location: PlatformLocation) {
    super();

    if (appBase !== null) {
      this.baseUrl = appBase;
    } else if (location !== null) {
      this.baseUrl = location.getBaseHrefFromDOM();
    }
  }
}
