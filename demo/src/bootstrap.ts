import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { DemoComponent } from './demo/demo.component';

enableProdMode();

bootstrap(DemoComponent, [HTTP_PROVIDERS]);
