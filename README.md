# ng2-inline-svg

[![NPM](https://nodei.co/npm/ng2-inline-svg.png?compact=true)](https://nodei.co/npm/ng2-inline-svg)

**[Demo](http://echeung.me/ng2-inline-svg)**

Angular 2 directive for inserting an SVG inline within an element, allowing for easily styling
with CSS like `fill: currentColor;`.

This is based on [md-icon](https://github.com/angular/material2/tree/master/src/components/icon),
except this is meant purely for inserting SVG files within an element, without the extra things like
font icons.


## Installation

```shell
npm install --save ng2-inline-svg
```


## Usage

Make sure to add `HTTP_PROVIDERS` to your list of bootstrap providers:

```typescript
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { App } from './app/app.component';

bootstrap(App, [HTTP_PROVIDERS]);
```

Import the component and add it to the list of directives on your component:

```typescript
import { Component } from '@angular/core';
import InlineSVG from 'ng2-inline-svg';

@Component({
  selector: 'app',
  directives: [InlineSVG],
  template: `
    <div class="my-icon" aria-label="My icon" [inlineSVG]="'/img/image.svg'"></div>
  `
})
export class App {
}
```

The SVG file (if found) will be inserted *inside* the element with the `[inlineSVG]` directive.


## Options

### Inputs

#### `[cacheSVG]`
Caches the SVG based on the absolute URL. Cache only persists for the (sessional) lifetime of the page.

Default: `true`

### Outputs

#### `(onSVGInserted)`
Emits the `SVGElement` that was inserted.
