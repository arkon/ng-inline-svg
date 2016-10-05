# ng2-inline-svg

[![NPM](https://nodei.co/npm/ng2-inline-svg.png?compact=true)](https://nodei.co/npm/ng2-inline-svg)

**[Demo](https://echeung.me/ng2-inline-svg)**

Angular 2 directive for inserting an SVG inline within an element, allowing for easily styling
with CSS like `fill: currentColor;`.

This is based on [md-icon](https://github.com/angular/material2/tree/master/src/lib/icon),
except this is meant purely for inserting SVG files within an element, without the extra things like
font icons.


## Installation

```shell
npm install --save ng2-inline-svg
```


## Usage

Add `InlineSVGModule` to your list of module imports:

```typescript
import { InlineSVGModule } from 'ng2-inline-svg';

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

The SVG file (if found) will be inserted *inside* the element with the `[inlineSVG]` directive.


### Options

#### Inputs

| Property name | Type | Default | Description |
| ------------- | ---- | ------- | ----------- |
| cacheSVG | boolean | `true` | Caches the SVG based on the absolute URL. Cache only persists for the (sessional) lifetime of the page. |
| replaceContents | boolean | `true` | Replaces the contents of the element with the SVG instead of just appending it to its children. |
| removeSVGAttributes | string[] | | An array of attribute names to remove from all child elements within the SVG. |

#### Outputs

| Property name | Callback arguments | Description |
| ------------- | ------------------ | ----------- |
| onSVGInserted | `e: SVGElement` | Emits the `SVGElement` post-insertion. |
