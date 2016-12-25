# ng-inline-svg

[![NPM](https://nodei.co/npm/ng-inline-svg.png?compact=true)](https://nodei.co/npm/ng-inline-svg)

**[Demo](https://echeung.me/ng-inline-svg)**

*Formally called [ng2-inline-svg](https://github.com/arkon/ng2-inline-svg)*

Angular 2+ directive for inserting an SVG inline within an element, allowing for easily styling
with CSS like `fill: currentColor;`.

This is based on [md-icon](https://github.com/angular/material2/tree/master/src/lib/icon),
except this is meant purely for inserting SVG files within an element, without the extra things like
font icons.


## Installation

```shell
npm install --save ng-inline-svg
```


## Usage

Add `InlineSVGModule` to your list of module imports:

```typescript
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, InlineSVGModule],
  bootstrap: [AppComponent]
})
class AppModule {}
```

You can then use the directive in your templates:

```typescript
@Component({
  selector: 'app',
  template: `
    <div class="my-icon" aria-label="My icon" [inlineSVG]="'/img/image.svg'"></div>
  `
})
export class AppComponent {
}
```

The SVG file (if found) will be inserted *inside* the element with the `[inlineSVG]` directive. Support for icons using the [`symbol` method](https://css-tricks.com/svg-symbol-good-choice-icons/) is also supported (e.g. `[inlineSVG]="'#shape-id'"`).


### Options

#### Inputs

| Property name | Type | Default | Description |
| ------------- | ---- | ------- | ----------- |
| cacheSVG | boolean | `true` | Caches the SVG based on the absolute URL. Cache only persists for the (sessional) lifetime of the page. |
| prepend | boolean | `false` | Inserts before the first child instead of appending, overwrites `replaceContents` |
| replaceContents | boolean | `true` | Replaces the contents of the element with the SVG instead of just appending it to its children. |
| removeSVGAttributes | string[] | | An array of attribute names to remove from all child elements within the SVG. |
| forceEvalStyles | boolean | `false` | Forces embeded style tags' contents to be evaluated (for IE 11). |
| evalScripts | `'always' | 'once' | 'none'` | `'always'` | Whether to evaluate embedded scripts in the loaded SVG files. |
| fallbackImgUrl | string | | URL for a regular image to be displayed as a fallback if the SVG fails to load. |

#### Outputs

| Property name | Callback arguments | Description |
| ------------- | ------------------ | ----------- |
| onSVGInserted | `e: SVGElement` | Emits the `SVGElement` post-insertion. |
| onSVGFailed | `e: any` | Emits when there is some error (e.g. embed SVG not supported, fetch failed, etc.) |
