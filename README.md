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

If you'd like to use a module, add `InlineSVGModule` to your list of app module imports:

```typescript
import { InlineSVGModule } from 'ng2-inline-svg';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, InlineSVGModule],
  bootstrap: [AppComponent]
})
class AppModule {}
```

Alternatively, you can directly add the directive to your component's decorator (making sure to also
provide either `HTTP_PROVIDERS` or `HttpModule` in your app module):

```typescript
import { Component } from '@angular/core';
import { InlineSVGDirective } from 'ng2-inline-svg';

@Component({
  selector: 'app',
  directives: [InlineSVGDirective],
  template: `
    <div class="my-icon" aria-label="My icon" [inlineSVG]="'/img/image.svg'"></div>
  `
})
export class AppComponent {
}
```

The SVG file (if found) will be inserted *inside* the element with the `[inlineSVG]` directive.


## Options

### Inputs

#### `[cacheSVG]`
Caches the SVG based on the absolute URL. Cache only persists for the (sessional) lifetime of the page.

Default: `true`

#### `[replaceContents]`
Replaces the contents of the element with the SVG instead of just appending it to its children.

Default: `true`

### Outputs

#### `(onSVGInserted)`
Emits the `SVGElement` that was inserted.
